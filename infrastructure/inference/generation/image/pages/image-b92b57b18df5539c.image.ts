import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB92b57b18df5539c = {
  id: "01a0c5f2-eb23-74b7-b3bc-29c4482f4885",
  type: "page-type/image",
  slug: "image-b92b57b18df5539c",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an ice queen, shimmering crystalline blue gown and frosted crown, icy palace backdrop, elegant cool expression, soft blue light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
