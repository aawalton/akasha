import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5c3c2c0563b61874 = {
  id: "01a0c5f4-03a4-7b4e-b2c0-aaf31136efaf",
  type: "page-type/image",
  slug: "image-5c3c2c0563b61874",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a fashion model in her late twenties posing under a cascading jungle waterfall, flowing summer dress damp from the mist, dramatic natural light, lush greenery, editorial fashion photograph, 85mm, natural skin texture",
  seed: 132720510,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
