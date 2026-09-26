import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image06400efea4ecc5de = {
  id: "01a0c5f3-7a9c-7cf4-abc1-5eab3de19fa5",
  type: "page-type/image",
  slug: "image-06400efea4ecc5de",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "topless woman seated, arms and hands artfully crossed over her chest, tousled auburn hair, warm window light, tender downward gaze, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 32569136,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
