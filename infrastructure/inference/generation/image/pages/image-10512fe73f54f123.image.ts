import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image10512fe73f54f123 = {
  id: "01a0c5f2-eb24-7322-b911-898e1668e24f",
  type: "page-type/image",
  slug: "image-10512fe73f54f123",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman reading a book in bed under a cozy knit blanket, wearing reading glasses, warm bedside lamp glow, propped against pillows, quiet contented expression, 50mm, shallow depth of field, soft warm light, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
