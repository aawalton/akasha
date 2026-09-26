import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image01876640ad2a6a22 = {
  id: "019f1836-db37-7df6-90e5-4cc6928f3357",
  type: "page-type/image",
  slug: "image-01876640ad2a6a22",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a samurai warrior, traditional armor and katana, cherry blossom courtyard, calm focused expression, soft daylight, 35mm, detailed armor, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
