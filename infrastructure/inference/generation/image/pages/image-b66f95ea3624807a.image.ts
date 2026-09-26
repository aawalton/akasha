import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB66f95ea3624807a = {
  id: "01a0c5f2-eb20-7eeb-ba8a-1e49278768f7",
  type: "page-type/image",
  slug: "image-b66f95ea3624807a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman sitting in a vast field of wildflowers, casual sundress, soft warm afternoon light, peaceful content smile toward the viewer, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
