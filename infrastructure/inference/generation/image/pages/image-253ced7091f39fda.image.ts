import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image253ced7091f39fda = {
  id: "019f57e0-83f1-715a-a551-853d57cc11d1",
  type: "page-type/image",
  slug: "image-253ced7091f39fda",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cool woman in black leather pants and a silk camisole leaning on a motorcycle, level unbothered stare, night street with neon reflections, photorealistic photograph, natural skin texture, film grain",
  seed: 99537351,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
