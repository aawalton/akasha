import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1fa1bfb5c7978d66 = {
  id: "01a0e9a0-ec3a-72a6-9110-50329c8abf37",
  type: "page-type/image",
  slug: "image-1fa1bfb5c7978d66",
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
    "Her face stays exactly as in the reference: a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part.\nReplace the background with a black volcanic sand beach at the edge of a wild jungle island, surf breaking behind her, a smoking mountain in the far distance under a clear blue sky. Change her clothes to an oversized dark grey t-shirt slipping off one shoulder, loose black shorts over black leggings, barefoot. Change her pose: she is sitting in the sand with her knees drawn up, one arm around her knees, the other hand lifted in front of her, looking at it in confusion. Relight her with bright harsh tropical sunlight from above to match the beach. Keep her face, freckles and hair identical.",
} as const satisfies Image
