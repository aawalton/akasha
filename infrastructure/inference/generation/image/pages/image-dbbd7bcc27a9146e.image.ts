import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDbbd7bcc27a9146e = {
  id: "01a0c5f3-b3c8-70f1-9806-b53c8b463352",
  type: "page-type/image",
  slug: "image-dbbd7bcc27a9146e",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Delaware personified as a beautiful young woman in her early twenties — honey-blonde hair windblown, colonial blue-and-buff dress with a peach blossom in her hair, Atlantic beach dunes and a small lighthouse behind her, soft coastal morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1680700853,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
