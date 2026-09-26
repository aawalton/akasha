import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5cf74b5b18e91d98 = {
  id: "01a0c5f2-eb22-7a57-93f3-05a238ed0936",
  type: "page-type/image",
  slug: "image-5cf74b5b18e91d98",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime cafe maid, frilly black-and-white maid dress with apron and headpiece, cozy cafe interior, cheerful welcoming smile, warm light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
