import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image43d851ab98041a27 = {
  id: "01a0c5f4-03a3-729c-86f6-d861ebab9ac9",
  type: "page-type/image",
  slug: "image-43d851ab98041a27",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of two young Korean women in their mid-twenties, slim kpop-idol figures, standing close in the rain, one embracing the other from behind cheek to cheek, both delighted smiles, soaked, wet lingerie, rain streaming down, tropical greenery, warm soft light, spontaneous candid snapshot",
  seed: 1730889368,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
