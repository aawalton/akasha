import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2212f5b91bb91d8b = {
  id: "01a0c5f4-03a3-7c57-ba5a-f376d5c5c60f",
  type: "page-type/image",
  slug: "image-2212f5b91bb91d8b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo from the front, two young Korean women in their mid-twenties, slim kpop-idol figures, in the rain, stacked one behind the other and both looking toward the camera, the front woman closest to the lens, the second woman tucked directly behind her back and taller, peeking over the front womans shoulder with a delighted grin, the rear womans arms around the front womans waist, drenched, wet lingerie, tropical greenery, soft natural light, spontaneous candid snapshot",
  seed: 210289416,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
