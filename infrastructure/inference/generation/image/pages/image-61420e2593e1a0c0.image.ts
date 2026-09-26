import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image61420e2593e1a0c0 = {
  id: "01a0c5f4-03a3-7809-86e8-1425b079d4a9",
  type: "page-type/image",
  slug: "image-61420e2593e1a0c0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full body in frame, two nude adult Korean women on a bed, one lying on top of the other, face to face and kissing, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 724425541,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
