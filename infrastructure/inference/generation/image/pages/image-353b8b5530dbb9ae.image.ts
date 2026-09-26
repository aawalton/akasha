import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image353b8b5530dbb9ae = {
  id: "01a0c5f2-eb1f-736c-adba-b0ad0f0bd195",
  type: "page-type/image",
  slug: "image-353b8b5530dbb9ae",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a bookstore date, casual cardigan and jeans, holding a book and glancing up with a warm smile, cozy shelves behind her, soft warm light, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
