import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image71c992938fa64fd6 = {
  id: "01a0c5f3-b3c9-7c04-8e26-cd3c4068ec2f",
  type: "page-type/image",
  slug: "image-71c992938fa64fd6",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "road-weary alluring woman in a denim jacket over a slip dress leaning on a motel doorframe, buzzing pink vacancy sign, photorealistic photograph, natural skin texture, film grain",
  seed: 1560438522,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
