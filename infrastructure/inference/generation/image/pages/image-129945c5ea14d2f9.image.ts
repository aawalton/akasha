import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image129945c5ea14d2f9 = {
  id: "01a10748-b652-723e-855c-efa42c1f6c20",
  type: "page-type/image",
  slug: "image-129945c5ea14d2f9",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-91a89543b823e875",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact man unchanged: the same face, the same eyes, brows, nose, mouth, expression, skin, short dark buzzed hair and dark beard, the same head angle. Change only his clothes and the background: he wears a plain white linen shirt open at the collar, and stands against a plain dark warm-toned wall in soft warm lamplight. Head and shoulders, photorealistic photograph.",
} as const satisfies Image
