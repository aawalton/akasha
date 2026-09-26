import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2b018d3cd76a527f = {
  id: "01a0c5f3-b3ca-7af4-9470-ebf21b8bf495",
  type: "page-type/image",
  slug: "image-2b018d3cd76a527f",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "serene woman with a gossamer veil over bare shoulders, eyes closed and face upturned, white morning studio, photorealistic photograph, natural skin texture, film grain",
  seed: 173134140,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
