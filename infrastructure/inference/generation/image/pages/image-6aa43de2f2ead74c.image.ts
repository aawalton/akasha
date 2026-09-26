import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6aa43de2f2ead74c = {
  id: "01a0c5f2-eb22-7347-858d-89fe7c247309",
  type: "page-type/image",
  slug: "image-6aa43de2f2ead74c",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime shrine maiden (miko), red hakama and white kimono top, long hair with ribbon, holding a paper talisman, traditional shrine backdrop, serene expression, soft daylight, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
