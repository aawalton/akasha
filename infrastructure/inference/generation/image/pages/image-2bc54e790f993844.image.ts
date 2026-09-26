import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2bc54e790f993844 = {
  id: "01a0c5f3-f002-7134-90c8-17220e431d1d",
  type: "page-type/image",
  slug: "image-2bc54e790f993844",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude adult Korean woman lying on a bed, her fingers massaging inside her vagina, legs apart, full body in frame, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 513994015,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
