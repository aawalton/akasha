import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3f39cf7bf32c2aa0 = {
  id: "01a0e967-a6ad-7154-9ebc-40d1e9584708",
  type: "page-type/image",
  slug: "image-3f39cf7bf32c2aa0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8105e06772c7004e",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. She dozes on her side in the dappled shade beneath a weeping willow in a park, her head pillowed on one arm, eyes closed, lips parted in sleep. A sheer iridescent silk scarf is draped loosely across her chest and hips, her knees drawn together, a fine silver chain necklace at her throat. Close crop from slightly above at her face and shoulders, green-gold light filtering through the willow fronds, drifting pollen in the air. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
