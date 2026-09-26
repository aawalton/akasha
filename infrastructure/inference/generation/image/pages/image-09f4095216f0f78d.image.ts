import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image09f4095216f0f78d = {
  id: "01a0c5f3-9f6f-7190-be40-393b475454a5",
  type: "page-type/image",
  slug: "image-09f4095216f0f78d",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Breathtaking woman in a flowing white chiffon dress on a windswept cliff meadow, fabric and long dark hair streaming sideways, barefoot, arms out, backlit by low golden sun through the dress, romantic fine art fashion photography\n",
  seed: 2040107241,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
