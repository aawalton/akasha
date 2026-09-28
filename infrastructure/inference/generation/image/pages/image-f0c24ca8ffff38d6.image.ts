import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF0c24ca8ffff38d6 = {
  id: "01a0e974-c34a-75b8-a098-a0112e465ac6",
  type: "page-type/image",
  slug: "image-f0c24ca8ffff38d6",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e0f2512734f4a5c6",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She dozes on her back on a cream quilted blanket in a sunny park, hands clasped behind her head, eyes closed, lips curved in a sleepy smile. She wears only a long strand of pearls and a wide-brimmed white sun hat, which rests over her chest, covering it; one knee is raised and turned inward, and the camera angle from beside her head hides her hips. Camera from above her head looking down along her body at a gentle angle, bright mid-morning sun, daisies in the grass. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
