import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d95944eb0245f20 = {
  id: "01a0c5f3-b3c8-763e-9225-500b432bd749",
  type: "page-type/image",
  slug: "image-2d95944eb0245f20",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "close portrait of a woman in a satin top with chin resting on her hand, slow-burn smolder, rembrandt window light, photorealistic photograph, natural skin texture, film grain",
  seed: 1184464803,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
