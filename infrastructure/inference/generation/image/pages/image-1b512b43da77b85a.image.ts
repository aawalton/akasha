import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1b512b43da77b85a = {
  id: "01a0c5f3-9f6e-7365-b101-3e40d3e433c1",
  type: "page-type/image",
  slug: "image-1b512b43da77b85a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid travel snapshot of two young Korean women in their mid-twenties with slim petite kpop-idol builds, standing together in a waterfall, soaked, wet lingerie, delighted smiles laughing together, spontaneous and authentic, handheld travel photo, lush rainforest, natural light",
  seed: 412792226,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
