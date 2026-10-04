import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFa2d871b5f478bc2 = {
  id: "01a1076b-286f-7a04-8af6-44841b5253c5",
  type: "page-type/image",
  slug: "image-fa2d871b5f478bc2",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-b6fb75d3907f9395", "image/image-4245fb8b8d3d84d1"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, near the far end of the hall. The dark-haired woman from the second image grins wide, her whole laughing mouth in it, leaning a little toward the red-haired woman with a playful wicked glint in her dark brown eyes, one hand pressed to her own chest over her sheet as she says it. The red-haired woman from the third image stands close beside her, caught between a shocked laugh and a deeper blush, her green eyes wide, a hand half covering her mouth. The dark-haired woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark brown salt-tousled waves, face as in the second image. The red-haired woman wears a white linen bath sheet wrapped high from armpits to thighs; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the third image. Steam drifts gold behind them, veined marble walls. Medium two-shot, waist up, 50mm lens, no text.",
} as const satisfies Image
