import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image82073f9bda5eca42 = {
  id: "01a0c5f2-eb1d-75e2-8456-84918e70a90e",
  type: "page-type/image",
  slug: "image-82073f9bda5eca42",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a draped gold Grecian-style gown among marble columns at dusk, soft glowing light, poised regal expression, 50mm, fine fabric drape, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
