import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7926411277917c0d = {
  id: "019f1839-0457-7d56-a36e-1cb88c4b79b4",
  type: "page-type/image",
  slug: "image-7926411277917c0d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two elegant young east asian women in their twenties, one with a sleek black bob and one with long soft brown hair, refined and graceful, soft cool urban evening light, calm gentle expressions, cinematic, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80060011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
