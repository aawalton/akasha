import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE2b511879b535d26 = {
  id: "01a0c5f2-eb25-7af5-aa9c-7d97fc619c18",
  type: "page-type/image",
  slug: "image-e2b511879b535d26",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing on a patio in light rain, wet transparent white t-shirt, droplets on skin, overcast soft daylight, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
