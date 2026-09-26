import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA99d9664f00fc912 = {
  id: "01a0c5f4-03a4-72a1-8bbf-6d472539675b",
  type: "page-type/image",
  slug: "image-a99d9664f00fc912",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two female fashion models in their twenties posing on rocks beside a waterfall, swimwear, dynamic confident poses, rainforest setting, soft diffused light, fashion editorial 35mm photograph, depth of field",
  seed: 2000903734,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
