import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7bb9470d3e8499aa = {
  id: "01a0c5f3-2542-765e-8d1a-d883ef5ba777",
  type: "page-type/image",
  slug: "image-7bb9470d3e8499aa",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "portrait of a woman in her early 30s in a wood-paneled library holding a book, gentle knowing smile, blonde hair half-up, blue eyes, fair skin, forest-green fine-knit sweater, warm lamp light mixed with window light, 85mm, shallow depth of field, photorealistic",
  seed: 1104549699,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
