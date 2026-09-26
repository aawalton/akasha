import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCd1cbe5d5b656ce9 = {
  id: "01a0c5f3-7a9c-73d6-9528-d5460604379f",
  type: "page-type/image",
  slug: "image-cd1cbe5d5b656ce9",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a lingerie model in her late twenties standing directly under a waterfall with water cascading over her, drenched, wet lace lingerie, confident glamour editorial pose, lush green rainforest, dramatic natural light, 85mm fashion photograph, wet skin and water droplets",
  seed: 1514056029,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
