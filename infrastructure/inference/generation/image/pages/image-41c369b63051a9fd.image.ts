import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image41c369b63051a9fd = {
  id: "01a0c5f2-eb20-725b-901b-ec371102e2d1",
  type: "page-type/image",
  slug: "image-41c369b63051a9fd",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman walking through a tall green bamboo grove, casual light clothing, soft filtered green light, serene gentle expression, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
