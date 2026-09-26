import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image11607f850b9e5b05 = {
  id: "01a0c5f3-f003-7905-8465-5cc246855422",
  type: "page-type/image",
  slug: "image-11607f850b9e5b05",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties tanning on a lounger on a rooftop terrace, summer swimsuit, city skyline in the background, warm afternoon light, photoreal 35mm lifestyle photograph, natural skin texture",
  seed: 1633473928,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
