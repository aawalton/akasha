import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image619e7d77131e8a3b = {
  id: "01a0c5f3-9f6e-7d16-ad68-69caacfe638f",
  type: "page-type/image",
  slug: "image-619e7d77131e8a3b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol build, standing in warm tropical rain under large palm leaves, delighted smile, drenched, wet lingerie, rain streaming down, warm soft light, authentic candid travel snapshot, natural skin texture",
  seed: 1734986138,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
