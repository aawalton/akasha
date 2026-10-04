import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB264044143e43cc4 = {
  id: "01a10744-1f63-7e3d-8810-aa5df5e2fba7",
  type: "page-type/image",
  slug: "image-b264044143e43cc4",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d6a4b4ce0bb3ec5d",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact man: same face, blue-grey eyes, short light brown beard and moustache, nose, brows, skin and smile. Take off his cap to show short light brown hair. Change the scene around him: he stands indoors in warm soft lamplight against a plain dark warm-toned wall, wearing a plain white linen shirt open at the collar, no coat, no scarf, no snow. Head and shoulders portrait, looking slightly off camera with a small relaxed smile, photorealistic photograph, 50mm lens.",
} as const satisfies Image
