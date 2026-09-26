import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image847d1948edb2bf70 = {
  id: "01a0c5f3-9f6e-7f0e-ad2e-03c368fa87fb",
  type: "page-type/image",
  slug: "image-847d1948edb2bf70",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties with a slim petite kpop-idol build, standing in a modern glass walk-in shower, water streaming over her, wet lingerie, delighted laughing smile, soft steam, warm bathroom light, authentic candid snapshot, natural skin texture",
  seed: 242903947,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
