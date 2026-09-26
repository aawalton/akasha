import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image10aaf254137e2761 = {
  id: "01a0c5f2-eb23-7514-ba90-fbc321cbcc48",
  type: "page-type/image",
  slug: "image-10aaf254137e2761",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime knight princess, ornate white-and-gold armored dress, sword and shield, grand fantasy castle hall, noble confident expression, warm light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
