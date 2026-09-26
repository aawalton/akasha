import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3a7a7264e7b3f6a4 = {
  id: "01a0c5f3-8d0e-73fa-826a-aa9924d2b173",
  type: "page-type/image",
  slug: "image-3a7a7264e7b3f6a4",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "piercing kohl-eyed woman in flowing desert wraps and gold coin jewelry, bare midriff, wind-whipped on a dune crest, sandstorm sunset, photorealistic photograph, natural skin texture, film grain",
  seed: 727165755,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
