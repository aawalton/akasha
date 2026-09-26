import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0a72e7198f95f547 = {
  id: "01a0c5f3-8d0d-77b2-ba8b-9f9177d82622",
  type: "page-type/image",
  slug: "image-0a72e7198f95f547",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a graceful adult water fae woman, mid-twenties, lithe figure, translucent teal dragonfly wings, long wet wavy turquoise hair, sea-green eyes, calm enchanting expression, shimmering dress like flowing water, hovering above a sunlit forest pond with ripples and mist, cool fresh light, 35mm full length, photorealistic",
  seed: 845,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
