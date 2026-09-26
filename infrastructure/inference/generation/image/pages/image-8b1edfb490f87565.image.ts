import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8b1edfb490f87565 = {
  id: "01a0c5f2-eb1f-753f-a5dc-12956d1c4130",
  type: "page-type/image",
  slug: "image-8b1edfb490f87565",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a casual walking date holding a to-go coffee, cozy sweater and scarf, glancing over with a warm smile, soft overcast city light, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
