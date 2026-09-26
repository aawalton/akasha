import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAd244d0b7a6f0c41 = {
  id: "01a0c5f2-eb21-7709-a4a1-e39591c5d923",
  type: "page-type/image",
  slug: "image-ad244d0b7a6f0c41",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman at an airport gate window watching planes, casual travel outfit with a backpack, soft daylight, calm anticipatory smile, boarding pass in hand, 35mm, candid travel photo, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
