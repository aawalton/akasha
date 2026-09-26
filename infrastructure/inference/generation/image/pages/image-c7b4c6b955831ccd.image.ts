import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC7b4c6b955831ccd = {
  id: "01a0c5f3-9f6a-7c13-a8c9-ef02374aad34",
  type: "page-type/image",
  slug: "image-c7b4c6b955831ccd",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman behind fogged shower glass, form softened by condensation, water droplets, soft light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1131461441,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
