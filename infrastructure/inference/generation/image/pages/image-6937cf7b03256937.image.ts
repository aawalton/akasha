import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6937cf7b03256937 = {
  id: "01a0c5f3-c686-7bf0-b418-6ebaba2ec8a3",
  type: "page-type/image",
  slug: "image-6937cf7b03256937",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid travel snapshot of a young Korean woman in her mid-twenties with a slim petite kpop-idol figure, standing in a waterfall glancing back over her shoulder with a delighted smile, soaked, wet lingerie, water droplets, warm natural light, spontaneous handheld travel photo, tropical greenery",
  seed: 1033501618,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
