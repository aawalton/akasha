import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1c21c76f8e76dd80 = {
  id: "01a0c5f2-eb20-73f7-8ff6-664b68ee3bf9",
  type: "page-type/image",
  slug: "image-1c21c76f8e76dd80",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman walking a forest path blanketed in autumn leaves, cozy sweater and scarf, warm golden light, gentle smile toward the viewer, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
