import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image492332309eb44d19 = {
  id: "01a1075b-89fc-72e3-abf3-543d5e8e46b8",
  type: "page-type/image",
  slug: "image-492332309eb44d19",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-4245fb8b8d3d84d1", "image/image-129945c5ea14d2f9"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the near end of the pool. The red-haired woman from the second image stands with her sheet clutched at her chest and turns her head to look down the long pool toward the far end, her green eyes serious and uneasy, speaking over her shoulder to the bearded man. The bearded man from the third image stands beside her, a little behind her shoulder, following her gaze down the pool with a thoughtful frown. She wears a white linen bath sheet wrapped high from armpits to thighs; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the second image. He wears a white linen bath sheet around his waist, bare chest; face, short dark buzzed hair and dark beard as in the third image. Down the pool, through drifting steam, the tall shut doors stand at the far end under plain marble. Gold light from the oculus. Over-the-shoulder two-shot looking down the pool, 35mm lens, moderate depth of field.",
} as const satisfies Image
