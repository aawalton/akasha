import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image716fcaf02ee3ca2f = {
  id: "019f1839-0397-717d-af8d-904382fb27b0",
  type: "page-type/image",
  slug: "image-716fcaf02ee3ca2f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two beautiful young women in their twenties with warm sun-kissed olive skin and dark wavy hair, on a sunlit Mediterranean coast, bright joyful expressions, breezy and relaxed, warm midday sun, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80050011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
