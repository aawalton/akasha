import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image15c1601aebd0a298 = {
  id: "01a0c5f3-9f6f-73f7-b3f9-5a6922e3821f",
  type: "page-type/image",
  slug: "image-15c1601aebd0a298",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful athletic woman with wet hair emerging from a turquoise sea, water running down her shoulders, black one-piece swimsuit, golden hour sun low behind her, droplets catching light, laughing, high-end swimwear campaign photography\n",
  seed: 1292267067,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
