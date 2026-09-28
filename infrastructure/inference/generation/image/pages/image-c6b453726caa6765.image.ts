import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC6b453726caa6765 = {
  id: "01a0e952-420b-7f52-94e8-6faf41ded78b",
  type: "page-type/image",
  slug: "image-c6b453726caa6765",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-ec0e2bb40b74cfa7",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Place her lying on her back sunbathing alone on a soft blanket on green grass in a sunny park, trees and dappled sunlight behind her, relaxed happy smile, eyes toward the viewer. She is nude but strategically covered: one arm draped across her chest and a folded towel over her hips, no nipples or genitals visible. No other people in the frame. Warm golden afternoon light, photorealistic, natural skin detail.",
} as const satisfies Image
