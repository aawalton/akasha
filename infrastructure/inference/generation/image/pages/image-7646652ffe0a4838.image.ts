import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7646652ffe0a4838 = {
  id: "01a0c5f2-eb22-7752-9fda-9f23debc46c1",
  type: "page-type/image",
  slug: "image-7646652ffe0a4838",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime battle mage, ornate robe with glowing runes and a staff, swirling magic energy, fantasy ruins backdrop, focused powerful expression, dramatic glowing light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
