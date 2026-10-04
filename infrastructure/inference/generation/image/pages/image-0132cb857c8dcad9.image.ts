import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0132cb857c8dcad9 = {
  id: "01a10759-3b2c-7851-b4ef-b28fb30a0c41",
  type: "page-type/image",
  slug: "image-0132cb857c8dcad9",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the pool's edge on the wet marble. The red-haired woman from the second image stands holding her sheet at her chest with one hand and opens her other hand outward in a helpless gesture at the dome, the pool and the steam around her, her mouth twisted, half bewildered and half wry, eyes on the dark-haired woman. The dark-haired woman from the third image stands close in front of her, arms folded over her own sheet, head tilted, listening with a frown. The red-haired woman wears a white linen bath sheet wrapped high from armpits to thighs; very slender and pale, freckled shoulders, green eyes, long red-gold hair in one thick plait, face as in the second image. The dark-haired woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark brown salt-tousled waves, face as in the third image. Steam lifts gold off the green water behind them under the oculus. Medium two-shot from the side, waist up, 50mm lens.",
} as const satisfies Image
