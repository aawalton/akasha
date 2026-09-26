import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image58afe3be38bb7609 = {
  id: "01a0c5f3-9f6a-767f-85d6-b11b7f6cf3cb",
  type: "page-type/image",
  slug: "image-58afe3be38bb7609",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "euphoric woman in a white shirt caught in a summer downpour, arms spread welcoming the rain, face upturned, empty rain-slick street, photorealistic photograph, natural skin texture, film grain",
  seed: 1841950645,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
