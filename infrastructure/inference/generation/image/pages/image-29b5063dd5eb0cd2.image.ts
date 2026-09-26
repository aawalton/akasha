import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image29b5063dd5eb0cd2 = {
  id: "01a0c5f4-03a4-7b0b-8688-adc39c0fb3cc",
  type: "page-type/image",
  slug: "image-29b5063dd5eb0cd2",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. She sits cross-legged on the living-room floor folding laundry, baskets around her, the wide bright room in soft afternoon light. Shot on an 85mm portrait lens, under soft natural daylight.",
  seed: 103,
  width: 1344,
  height: 576,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
