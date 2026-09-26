import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8dcfa02bd0450972 = {
  id: "01a0c5f3-f003-7fa4-be0a-4144b762ece9",
  type: "page-type/image",
  slug: "image-8dcfa02bd0450972",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two women in their twenties in light floral summer sundresses strolling through a blooming garden, warm daylight, smiling, candid 35mm lifestyle photograph, depth of field",
  seed: 1565922698,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
