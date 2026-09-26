import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image93dc13993a2aec03 = {
  id: "01a0c5f3-8d0d-77eb-9d61-8c1cebd0cd64",
  type: "page-type/image",
  slug: "image-93dc13993a2aec03",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a graceful petite water fae woman, slim youthful frame, translucent teal wings, long wet wavy turquoise hair clinging to her, sea-green eyes, calm enchanting look, minimal covering of water droplets and a thin strand of waterweed, standing on a lily pad above a sunlit pond, fresh cool light, tasteful artful, 35mm full length, photorealistic",
  seed: 854,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
