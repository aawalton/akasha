import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image11a431dba5e711f5 = {
  id: "01a0c5f4-03a3-777b-8c26-f4c4872e6ee5",
  type: "page-type/image",
  slug: "image-11a431dba5e711f5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close-up of two nude adult women on a bed, one lying on top of the other, face to face and kissing, foreheads close, intimate bedroom scene, photorealistic, 50mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 170679039,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
