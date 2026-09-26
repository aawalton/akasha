import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image42ee352988515eb9 = {
  id: "01a0c5f3-8d0d-78bc-9c3c-8ed919c08c96",
  type: "page-type/image",
  slug: "image-42ee352988515eb9",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid snapshot of two young Korean women in their mid-twenties with slim petite kpop-idol builds, together in a large walk-in shower, soaked, wet lingerie, delighted smiles laughing together, steam and glass, warm light, authentic spontaneous photo",
  seed: 1757679156,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
