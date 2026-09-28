import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image456ddb755012ef07 = {
  id: "01a0e936-cb33-77b0-9143-57251be92876",
  type: "page-type/image",
  slug: "image-456ddb755012ef07",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8105e06772c7004e",
  persona: "persona/akasha",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Place her lying on her back sunbathing alone on a soft blanket on green grass in a sunny park, trees and dappled sunlight behind her, relaxed happy smile, eyes toward the viewer. She is nude but strategically covered: one arm draped across her chest and a folded towel over her hips, no nipples or genitals visible. No other people in the frame. Warm golden afternoon light, photorealistic, natural skin detail.",
} as const satisfies Image
