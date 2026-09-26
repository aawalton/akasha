import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image29d5e06b4b0c5ed3 = {
  id: "01a0c5f4-03a3-7b81-8933-fb3bc38328b2",
  type: "page-type/image",
  slug: "image-29d5e06b4b0c5ed3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of two young Korean women in their mid-twenties, slim kpop-idol builds, standing in the rain in a back embrace, the one behind resting her head on the others shoulder with eyes closed, both delighted soft smiles, soaked, wet lingerie, lush green background, warm soft light, spontaneous candid snapshot",
  seed: 1682431723,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
