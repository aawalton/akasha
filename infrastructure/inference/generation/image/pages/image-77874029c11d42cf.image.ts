import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image77874029c11d42cf = {
  id: "019f1836-d6f7-7f7b-bfba-fe4534828f14",
  type: "page-type/image",
  slug: "image-77874029c11d42cf",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime fox-spirit (kitsune), white-and-red kimono, fox ears and tails, fox mask pushed to the side, glowing torii gate at night, mysterious smile, warm lantern light, 50mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
