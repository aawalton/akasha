import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ed7ee235022e211 = {
  id: "01a0c5f2-eb25-7cfa-8501-0cb6a1830f09",
  type: "page-type/image",
  slug: "image-7ed7ee235022e211",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, stepping out of a pool, dripping wet transparent white t-shirt clinging, water on shoulders, bright daylight, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
