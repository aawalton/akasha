import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image40f3508c1bd887ef = {
  id: "01a0c5f3-9f6b-7c50-8484-21f65d13a687",
  type: "page-type/image",
  slug: "image-40f3508c1bd887ef",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "secretly smiling woman in a black velvet dress reaching for a book from a rolling library ladder, looking down at camera, candlelit mahogany stacks, photorealistic photograph, natural skin texture, film grain",
  seed: 604666510,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
