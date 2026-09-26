import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image40362ae1f467dc65 = {
  id: "01a0c5f3-b3c8-77b9-843d-98cee3645492",
  type: "page-type/image",
  slug: "image-40362ae1f467dc65",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her twenties stretching before a run on a grassy field, athletic wear, bright daylight, healthy and energetic, candid 35mm lifestyle photograph, natural skin texture",
  seed: 1527438587,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
