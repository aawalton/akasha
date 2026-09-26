import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA1e90d1d351b4f90 = {
  id: "01a0c5f4-03a3-7234-a40d-7919c2b9f9f3",
  type: "page-type/image",
  slug: "image-a1e90d1d351b4f90",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full body in frame, two nude adult Korean lesbian women on a bed in missionary position, one lying on top of the other, face to face and kissing, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 527042176,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
