
  
  
  let scene, camera, renderer, sphereCamera;


function init() {

    scene = new THREE.Scene();
    
  camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,5000);
  
  camera.position.set(0,400,1000);
  
  renderer = new THREE.WebGLRenderer({antialias:true});
  
  renderer.setSize(window.innerWidth,window.innerHeight);
  
  document.body.appendChild(renderer.domElement);
  
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  
  controls.enableZoom = false;
  
   let urls = [
  'posx.jpg', 'negx.jpg',
  'posy.jpg', 'negy.jpg',
  'posz.jpg', 'negz.jpg',
];

let loader = new THREE.CubeTextureLoader();

scene.background = loader.load(urls);

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );

sphereCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

sphereCamera.position.set(0, 100, 0);

scene.add(sphereCamera);

let sphereMaterial = new THREE.MeshBasicMaterial( {envMap: sphereCamera.renderTarget} );

//let sphereGeo =  new THREE.SphereGeometry(400, 50, 50);

let sphereGeo =  new THREE.TorusGeometry(300, 150, 25, 100);

let mirrorSphere = new THREE.Mesh(sphereGeo, sphereMaterial);

mirrorSphere.position.set(0, 100, 0);

scene.add(mirrorSphere);

  render();
    function render() {
      mirrorSphere.rotation.y += 0.01;
      mirrorSphere.rotation.x += 0.007;
 renderer.render(scene,camera)
  sphereCamera.updateCubeMap( renderer, scene );
  requestAnimationFrame(render);
}
  }
  
  init();

