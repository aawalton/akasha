import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7023f531a0919c46 = {
  id: "01a0e933-9277-7050-9f08-a09f15e5a4f3",
  type: "page-type/image",
  slug: "image-7023f531a0919c46",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-0d953de65e55acaf",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep her exact face, hair, horns, eyes and features. Place her lying on her back sunbathing on a soft blanket on green grass in a sunny city park, trees and dappled sunlight behind her, relaxed happy smile, eyes toward the viewer. She is nude but strategically covered: one arm draped across her chest and a folded towel over her hips, no nipples or genitals visible. Warm golden afternoon light, photorealistic, natural skin detail.",
} as const satisfies Image
