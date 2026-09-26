import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA8f6809a4f8813b5 = {
  id: "01a0c5f3-b3c9-7581-b311-b2ca55e1302a",
  type: "page-type/image",
  slug: "image-a8f6809a4f8813b5",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "peaceful woman in a silk pajama set wrapped in a blanket at a rooftop edge, first-light face, city waking below, photorealistic photograph, natural skin texture, film grain",
  seed: 1666483116,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
