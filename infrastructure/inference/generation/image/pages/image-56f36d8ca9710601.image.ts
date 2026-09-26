import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image56f36d8ca9710601 = {
  id: "01a0c5f2-eb24-7d3a-acba-3e31d8eaee0f",
  type: "page-type/image",
  slug: "image-56f36d8ca9710601",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman half-asleep reading by a bedside lamp, eyes drowsy, book slipping in her hand, soft warm glow, quiet late-evening calm, 50mm, shallow depth of field, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
