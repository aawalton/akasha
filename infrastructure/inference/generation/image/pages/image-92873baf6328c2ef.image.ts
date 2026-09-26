import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image92873baf6328c2ef = {
  id: "01a0c5f2-eb1e-73fb-b151-f70d3408204f",
  type: "page-type/image",
  slug: "image-92873baf6328c2ef",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a plaid A-line skirt, sweater and tights on an autumn street, fallen leaves, warm golden light, gentle smile, 35mm, candid, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
