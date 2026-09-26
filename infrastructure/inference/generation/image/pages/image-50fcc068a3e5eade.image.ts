import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image50fcc068a3e5eade = {
  id: "01a0c5f4-03a3-786e-a6b5-a32a5d804cd1",
  type: "page-type/image",
  slug: "image-50fcc068a3e5eade",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full body in frame, two nude adult Korean lesbian women on a bed in missionary position, one lying on top of the other, face to face and kissing, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 674748490,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
