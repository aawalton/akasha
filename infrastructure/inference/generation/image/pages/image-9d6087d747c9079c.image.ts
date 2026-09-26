import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9d6087d747c9079c = {
  id: "01a0c5f3-9f6e-7b82-900f-75d23ce52544",
  type: "page-type/image",
  slug: "image-9d6087d747c9079c",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties with a slim petite kpop-idol build, standing outdoors in pouring rain, drenched, wet lingerie, delighted laughing smile, rain streaming down her, soft overcast natural light, lush green garden background, authentic candid snapshot, natural skin texture",
  seed: 1058960780,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
