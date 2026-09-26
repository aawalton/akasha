import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3e1ee042531c7d5a = {
  id: "01a0c5f2-eb1f-70c3-b638-ce276accb3cc",
  type: "page-type/image",
  slug: "image-3e1ee042531c7d5a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman stretching her legs on an outdoor running track, athletic wear, calm focused warm-up, soft early morning light, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
