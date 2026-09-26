import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5aa00b2b3a82b599 = {
  id: "01a0c5f2-eb21-723f-809e-147d8747fe1e",
  type: "page-type/image",
  slug: "image-5aa00b2b3a82b599",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman among lush green Bali rice terraces, casual tropical outfit, soft warm light, serene joyful smile, 35mm, candid travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
