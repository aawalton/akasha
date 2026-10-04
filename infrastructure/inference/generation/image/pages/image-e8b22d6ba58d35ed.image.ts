import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8b22d6ba58d35ed = {
  id: "01a10769-a631-761e-a1de-bcf792033d58",
  type: "page-type/image",
  slug: "image-e8b22d6ba58d35ed",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, near the far end of the hall. The red-haired woman from the second image, still blushing pink from face to collarbones, adds something quickly and dryly, her mouth in a small wry line, her green eyes flicking sideways to meet the dark-haired woman's for a moment, one hand holding her sheet at her chest. The dark-haired woman from the third image stands a step away and turns toward her with sudden warm interest, her lips parted in delight, eyes bright. The red-haired woman wears a white linen bath sheet wrapped high from armpits to thighs; very slender, pale, freckled shoulders, long red-gold hair in one thick plait, face as in the second image. The dark-haired woman wears a white linen bath sheet from armpits to thighs; olive skin, nose freckles, dark brown salt-tousled waves, face as in the third image. Steam drifts gold behind them, marble benches with white linen. Medium two-shot, waist up, 50mm lens, no text.",
} as const satisfies Image
