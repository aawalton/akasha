import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD16f60bddd04d035 = {
  id: "01a10766-76c6-793e-a898-471865cddbbb",
  type: "page-type/image",
  slug: "image-d16f60bddd04d035",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-4245fb8b8d3d84d1", "image/image-b6fb75d3907f9395"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, before the tall dark shut doors at the far end. The red-haired woman from the second image has just said the plain conclusion aloud: she takes a breath, shoulders squared, her face composed but flushed pink, her green eyes turned to the dark-haired woman, her free hand open as if laying the facts on a table. The dark-haired woman from the third image stands facing her a step away, one eyebrow up and the corner of her wide mouth starting to curl into a grin, arms loosely folded over her sheet. The red-haired woman wears a white linen bath sheet wrapped high from armpits to thighs; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the second image. The dark-haired woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark brown salt-tousled waves, face as in the third image. Dark doors behind them, steam in gold oculus light. Medium two-shot in profile, waist up, 50mm lens, no text.",
} as const satisfies Image
