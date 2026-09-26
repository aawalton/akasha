import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image54bc039906df4e5c = {
  id: "01a0c5f3-f003-7a9e-8e66-ca387e7bd719",
  type: "page-type/image",
  slug: "image-54bc039906df4e5c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties in a light blue sundress twirling in a sunlit field of wildflowers, joyful, warm golden-hour light, dynamic 85mm candid portrait, motion in the fabric",
  seed: 261190878,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
