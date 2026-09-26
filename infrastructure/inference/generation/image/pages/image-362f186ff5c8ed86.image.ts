import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image362f186ff5c8ed86 = {
  id: "01a0c5f2-eb24-73c1-9321-4c7c3c63ca62",
  type: "page-type/image",
  slug: "image-362f186ff5c8ed86",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman nude standing in a glass shower, water streaming, hair wet, gentle relaxed smile, soft warm light through misted glass, intimate and serene, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
