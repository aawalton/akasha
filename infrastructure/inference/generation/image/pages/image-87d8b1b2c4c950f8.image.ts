import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image87d8b1b2c4c950f8 = {
  id: "01a0c5f2-eb1f-72e5-aa09-574a17f0f2e9",
  type: "page-type/image",
  slug: "image-87d8b1b2c4c950f8",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a summer date holding an ice cream cone, casual t-shirt and denim shorts, walking a sunny street, playful happy smile toward the viewer, warm light, 35mm, candid, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
