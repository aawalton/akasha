import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image948f56b838322fb9 = {
  id: "01a0c5f2-eb25-751a-88a5-f04892766b1d",
  type: "page-type/image",
  slug: "image-948f56b838322fb9",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing outdoors at golden hour, wet transparent white t-shirt, backlit rim light through the fabric, water droplets, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
