import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9c05d013b08eb725 = {
  id: "019f1839-08b1-7a5d-811b-f6d36c7b091d",
  type: "page-type/image",
  slug: "image-9c05d013b08eb725",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of two young women lovers a breath apart, noses nearly touching, eyes lowered to each other's lips in the hush before a kiss, bare shoulders and skin, one honey-blonde and one raven-haired, warm golden backlight haloing their hair, breathless and sensual, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80360011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
