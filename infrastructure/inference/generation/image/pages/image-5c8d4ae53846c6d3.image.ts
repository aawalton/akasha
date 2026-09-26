import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5c8d4ae53846c6d3 = {
  id: "01a0c5f2-eb25-7789-b82a-fa3dad62a738",
  type: "page-type/image",
  slug: "image-5c8d4ae53846c6d3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, sitting on a soft rug on the floor, knees drawn up, wearing a burgundy bra and panties set, warm window light, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
