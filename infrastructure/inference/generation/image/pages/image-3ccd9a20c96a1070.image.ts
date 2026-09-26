import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3ccd9a20c96a1070 = {
  id: "01a0c5f2-eb23-7c5b-9c46-c77e90ef45df",
  type: "page-type/image",
  slug: "image-3ccd9a20c96a1070",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a fantasy elf ranger, pointed ears, leather armor and green hooded cloak, bow on her back, forest backdrop, confident expression, soft dappled light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
