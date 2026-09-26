import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image43d15e86232bde00 = {
  id: "01a0c5f2-eb21-73df-967b-722812a71c55",
  type: "page-type/image",
  slug: "image-43d15e86232bde00",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman at a Machu Picchu overlook, casual hiking outfit, ancient ruins and green peaks behind, bright clear light, triumphant joyful smile, 35mm, travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
