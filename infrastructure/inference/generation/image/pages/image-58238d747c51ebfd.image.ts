import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image58238d747c51ebfd = {
  id: "01a0c5f2-eb25-7897-bcd2-45539df04117",
  type: "page-type/image",
  slug: "image-58238d747c51ebfd",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing in a steamy bathroom, soaked transparent white t-shirt clinging to her skin, water droplets, wet hair, soft overhead light, 85mm portrait, visible skin texture, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
