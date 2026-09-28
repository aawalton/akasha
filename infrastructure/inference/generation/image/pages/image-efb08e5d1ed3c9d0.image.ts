import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEfb08e5d1ed3c9d0 = {
  id: "01a0e948-ddd2-7fec-a7f7-9e8fb1b9d60c",
  type: "page-type/image",
  slug: "image-efb08e5d1ed3c9d0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-4f5aee4e3ff38180",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Place her lying on her back sunbathing alone on a soft blanket on green grass in a sunny park, trees and dappled sunlight behind her, relaxed happy smile, eyes toward the viewer. She is nude but strategically covered: one arm draped across her chest and a folded towel over her hips, no nipples or genitals visible. No other people in the frame. Warm golden afternoon light, photorealistic, natural skin detail.",
} as const satisfies Image
