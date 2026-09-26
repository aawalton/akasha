import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image03d851b3a0e58200 = {
  id: "01a0c5f3-b3c9-7ff5-aef4-0818e4fb0f23",
  type: "page-type/image",
  slug: "image-03d851b3a0e58200",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "mysterious woman in a loosely worn silk kimono over a slip, kneeling at a low table pouring tea, tatami room at dusk, photorealistic photograph, natural skin texture, film grain",
  seed: 428071848,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
