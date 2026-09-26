import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE3abca2d4c11a815 = {
  id: "01a0c5f3-b3c9-7c02-88c0-f2d0e5a31cf9",
  type: "page-type/image",
  slug: "image-e3abca2d4c11a815",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "silver-blonde woman in a white silk column dress holding a champagne flute, soft amused smile, art gallery opening, clean gallery light, photorealistic photograph, natural skin texture, film grain",
  seed: 1018776739,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
