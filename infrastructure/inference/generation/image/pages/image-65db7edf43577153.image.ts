import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image65db7edf43577153 = {
  id: "01a0c5f3-9f6e-75a4-b827-d0d367871d8f",
  type: "page-type/image",
  slug: "image-65db7edf43577153",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol build, standing in a glass shower running her hand through her wet hair, delighted smile, drenched, wet lingerie, steam, warm bathroom light, authentic candid snapshot, natural skin texture",
  seed: 108347893,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
