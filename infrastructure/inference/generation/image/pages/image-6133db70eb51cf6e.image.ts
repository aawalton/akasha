import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6133db70eb51cf6e = {
  id: "01a0c5f2-eb21-7de1-a48b-50ee16507aeb",
  type: "page-type/image",
  slug: "image-6133db70eb51cf6e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman at a Grand Canyon overlook, casual outdoor wear and sunglasses, vast canyon vista behind, bright warm light, awed happy expression, 35mm, travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
