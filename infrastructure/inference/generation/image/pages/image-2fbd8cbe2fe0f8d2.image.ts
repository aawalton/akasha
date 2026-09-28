import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2fbd8cbe2fe0f8d2 = {
  id: "01a0e970-3084-7980-8f70-1f98393f9616",
  type: "page-type/image",
  slug: "image-2fbd8cbe2fe0f8d2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f25c882c9b062373",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She sits sideways on a sunny park lawn with her knees drawn up to her chest, which hides it, rubbing sunscreen into her bare shoulder with one hand, looking down at her shoulder in concentration. She wears a wide-brimmed straw sun hat, a turquoise bikini bottom, and a stack of thin gold bangles; a bottle of sunscreen and a folded peach towel lie beside her. Side profile camera, crisp bright noon sun and short shadows, a hedge of roses behind her. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
