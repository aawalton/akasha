import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1e10148bd82df468 = {
  id: "01a0c5f2-eb22-7c07-bbff-bbc77431fb50",
  type: "page-type/image",
  slug: "image-1e10148bd82df468",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime swordswoman, flowing battle kimono with armor accents, katana drawn, falling cherry blossoms, determined expression, dramatic light, 35mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
