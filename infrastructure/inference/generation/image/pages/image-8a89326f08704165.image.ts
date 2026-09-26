import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8a89326f08704165 = {
  id: "01a0c5f2-eb20-76e6-b0ff-bd5c3ed84cad",
  type: "page-type/image",
  slug: "image-8a89326f08704165",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman by a calm mirror-still mountain lake at dawn, casual jacket, soft reflective light, contemplative gaze across the water, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
