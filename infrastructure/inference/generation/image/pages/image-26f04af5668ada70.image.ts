import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image26f04af5668ada70 = {
  id: "01a0c5f4-03a3-7169-addf-03052f7d2f1c",
  type: "page-type/image",
  slug: "image-26f04af5668ada70",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full body in frame, two nude adult Korean women on a bed, one lying on top of the other, face to face and kissing, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 439543998,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
