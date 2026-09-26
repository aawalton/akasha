import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image19eaebf69ed2381d = {
  id: "01a0c5f2-eb23-7d6a-a734-5021b425e816",
  type: "page-type/image",
  slug: "image-19eaebf69ed2381d",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a stylish witch, wide-brim black hat, dark layered dress, glowing magic in one hand, moody candlelit room, mysterious smile, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
