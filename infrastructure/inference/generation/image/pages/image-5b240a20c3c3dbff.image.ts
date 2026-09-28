import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5b240a20c3c3dbff = {
  id: "01a0e99e-2f33-78f2-b11a-768828332a02",
  type: "page-type/image",
  slug: "image-5b240a20c3c3dbff",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-17f59c7233925455",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Her face stays exactly as in the reference: a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part.\nPut this woman on a black sand beach on a wild tropical island. She sits in the sand, bewildered, staring at her own hand. Loose oversized grey t-shirt slipping off one shoulder, black shorts over opaque full-length black tights, bare feet. Keep her face exactly the same. Epic fantasy film still.",
} as const satisfies Image
