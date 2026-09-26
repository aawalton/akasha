import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image628c88a7c86f4bce = {
  id: "01a0c5f4-03a3-709b-95cd-2cf6eb48f34b",
  type: "page-type/image",
  slug: "image-628c88a7c86f4bce",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up of two nude adult women on a bed, one lying on top of the other, face to face and kissing, foreheads close, intimate bedroom scene, photorealistic, 50mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 1895711474,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
