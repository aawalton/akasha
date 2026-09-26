import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image071881bf26c42946 = {
  id: "01a0c5f3-8d0d-7869-864f-b8556a29b1a7",
  type: "page-type/image",
  slug: "image-071881bf26c42946",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two lingerie models in their late twenties standing together in a waterfall, soaked through, wet lingerie, dynamic confident poses, rainforest setting, soft diffused light, fashion editorial 35mm photograph, water spray",
  seed: 1635060206,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
