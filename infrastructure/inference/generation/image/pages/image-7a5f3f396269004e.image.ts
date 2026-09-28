import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7a5f3f396269004e = {
  id: "01a0e99a-50b8-790d-9d4d-d8df7ddb68b5",
  type: "page-type/image",
  slug: "image-7a5f3f396269004e",
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
    "Keep this exact woman, same face and hair. Extreme close-up film still: her face and her raised hand fill the frame. She holds her small pale hand up before her eyes, turning it over, studying her own fingers with dawning disbelief. Her long dark red hair falls in a heavy rope across the collar of an oversized grey t-shirt slipping off her freckled shoulder. Harsh tropical noon sun from above, skin glistening with sweat, a few grains of black sand stuck to her cheek. Behind her, completely out of focus, blue surf and a black beach. Shot on ARRI Alexa with an 85mm lens at f/1.4, natural skin texture, film grain.",
} as const satisfies Image
