import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a771f1cd525eb22 = {
  id: "01a0c5f3-f002-722a-ab7b-139b63ec24c6",
  type: "page-type/image",
  slug: "image-1a771f1cd525eb22",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude adult Korean woman masturbating on a bed, full body in frame, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 1297986697,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
