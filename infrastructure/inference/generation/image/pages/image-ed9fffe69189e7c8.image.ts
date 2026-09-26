import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEd9fffe69189e7c8 = {
  id: "01a0c5f3-f003-76ba-acd0-6e4bb092a227",
  type: "page-type/image",
  slug: "image-ed9fffe69189e7c8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties walking down a charming cobblestone street in a light pastel sundress, warm summer afternoon light, candid 50mm street photograph, shallow depth of field, natural skin texture",
  seed: 1547259708,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
