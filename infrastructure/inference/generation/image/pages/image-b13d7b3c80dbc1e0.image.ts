import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB13d7b3c80dbc1e0 = {
  id: "01a10768-83be-70e8-b6a4-49b52c185f91",
  type: "page-type/image",
  slug: "image-b13d7b3c80dbc1e0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-4245fb8b8d3d84d1"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, near the far end of the hall by the doors. The red-haired woman from the second image has gone red to the collarbones, a deep blush covering her face, throat and freckled upper chest above her sheet. She stands with both hands clasped together over the sheet at her breastbone, shoulders drawn up, eyes lowered to the wet marble at her feet, biting her lower lip, embarrassed but determined to say it. She is very slender, pale and narrow-shouldered, light freckles across her shoulders, long red-gold hair in one thick plait over her shoulder, her face as in the second image. She wears a white linen bath sheet wrapped high from her armpits to her thighs. Behind her the veined marble wall and heated benches stacked with white linen, steam drifting in warm gold oculus light, softly blurred. Close shot, head and shoulders, eye level, 85mm lens, shallow depth of field, no other people, no text.",
} as const satisfies Image
