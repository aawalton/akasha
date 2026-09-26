import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCec8ebc6c91a473b = {
  id: "01a0c5f3-9f6e-7f8c-94c8-091d861cf7b6",
  type: "page-type/image",
  slug: "image-cec8ebc6c91a473b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid snapshot of two young Korean women in their mid-twenties with slim petite kpop-idol builds, standing together in the rain, soaked, wet lingerie, delighted smiles laughing together, rain streaming down, soft natural light, lush background, authentic spontaneous photo",
  seed: 325523321,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
