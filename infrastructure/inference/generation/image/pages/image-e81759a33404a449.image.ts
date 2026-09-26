import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE81759a33404a449 = {
  id: "01a0c5f2-eb24-7808-8826-2413fb471914",
  type: "page-type/image",
  slug: "image-e81759a33404a449",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing on a balcony, wearing a short wrap skirt and a fitted sleeveless top, breezy golden-hour light, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
