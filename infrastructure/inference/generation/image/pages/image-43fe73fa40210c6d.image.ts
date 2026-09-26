import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image43fe73fa40210c6d = {
  id: "01a0c5f3-8d0d-771c-a059-517b3da0257c",
  type: "page-type/image",
  slug: "image-43fe73fa40210c6d",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a graceful petite water fae woman, slim youthful frame, translucent teal wings, long wavy turquoise hair, sea-green eyes, serene expression, nude natural figure, standing on a large lily pad above a sunlit forest pond with soft mist, fresh cool light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 864,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
