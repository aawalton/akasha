import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3c8c32ece8ed3d23 = {
  id: "019f1839-0aa7-77c9-bc9e-a936deb6e9e4",
  type: "page-type/image",
  slug: "image-3c8c32ece8ed3d23",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two nereid sea-nymph lovers lying tangled together in moonlit shallows, wet luminous bare skin and wet flowing hair, draped with pearls, one drawing the other close a breath from a kiss, one silver-blonde and one soft platinum, cool oceanic luminosity, sensual and dreamlike, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80440011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
