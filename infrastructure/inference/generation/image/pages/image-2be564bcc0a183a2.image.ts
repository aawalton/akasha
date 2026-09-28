import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2be564bcc0a183a2 = {
  id: "01a0e999-978a-709e-8b43-d9e0c830e0ab",
  type: "page-type/image",
  slug: "image-2be564bcc0a183a2",
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
    "Put this woman on a black sand beach on a wild tropical island. She sits in the sand, bewildered, staring at her own hand. Loose oversized grey t-shirt slipping off one shoulder, black shorts over black tights, bare feet. Keep her face exactly the same. Epic fantasy film still.",
} as const satisfies Image
