import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image04e57e5a1065acb1 = {
  id: "01a1075a-598d-7389-830b-6d18a1528b8f",
  type: "page-type/image",
  slug: "image-04e57e5a1065acb1",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, at the pool's edge on the wet marble. The dark-haired woman from the second image lays her hand flat on her own chest above her sheet as she introduces herself, chin up, a frank open smile, her eyes on the red-haired woman. The red-haired woman from the third image stands facing her a couple of feet away, sheet clutched at her chest, answering with a small dry twist of her mouth, one eyebrow lifted, her green eyes on the dark-haired woman. The dark-haired woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark brown salt-tousled waves, face as in the second image. The red-haired woman wears a white linen bath sheet wrapped high from armpits to thighs; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the third image. Steam drifting gold behind them over the green pool, light from the oculus. Medium two-shot in profile, waist up, 50mm lens.",
} as const satisfies Image
