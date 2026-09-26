import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image72e37817caad5aff = {
  id: "019f5804-ed0b-793f-aa8e-232704eb36d6",
  type: "page-type/image",
  slug: "image-72e37817caad5aff",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "defiant woman in a deconstructed pinstripe suit worn as a dress, editorial power stance with chin raised, white cyclorama studio, photorealistic photograph, natural skin texture, film grain",
  seed: 956163522,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
