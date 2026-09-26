import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7efa888f78efaafb = {
  id: "01a0c5f3-8d0d-7101-8796-d007ab1f4633",
  type: "page-type/image",
  slug: "image-7efa888f78efaafb",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a slim petite night fae woman, slight delicate figure, luminous violet moth wings with glowing patterns, long dark hair, glowing lavender eyes, calm mysterious expression, nude natural figure, standing in a moonlit forest clearing with fireflies, cool violet and blue light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 863,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
