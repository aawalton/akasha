import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image708ca5b6ea207500 = {
  id: "01a10764-68ce-763a-ac06-950614e3d2c9",
  type: "page-type/image",
  slug: "image-708ca5b6ea207500",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, near the tall dark shut doors at the far end of the hall. The red-haired woman from the second image stands with her sheet held at her chest in one hand and her other arm wrapped across her middle, speaking quietly, her chin trembling slightly and her green eyes bright and wet, looking off to one side as she thinks of home. She is very slender, pale and narrow-shouldered, light freckles across her shoulders, fine features, long red-gold hair in one thick plait over her shoulder, her face as in the second image. She wears a white linen bath sheet wrapped high from her armpits to her thighs. Behind her the veined white and green marble wall and the edge of the dark doors, softly blurred, steam drifting in warm gold light from the oculus. Close medium shot, head to waist, eye level, 85mm lens, shallow depth of field, no text, no other people.",
} as const satisfies Image
