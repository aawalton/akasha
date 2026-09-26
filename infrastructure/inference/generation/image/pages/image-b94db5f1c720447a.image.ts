import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB94db5f1c720447a = {
  id: "01a0c5f3-f002-7c90-8f47-bd3325c34fb4",
  type: "page-type/image",
  slug: "image-b94db5f1c720447a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude adult Korean woman lying on a bed, her fingers massaging inside her vagina, legs apart, full body in frame, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 2044874853,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
