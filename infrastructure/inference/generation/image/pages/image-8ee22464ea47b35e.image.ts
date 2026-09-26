import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8ee22464ea47b35e = {
  id: "019f1839-05ea-763c-942f-4901ef07620e",
  type: "page-type/image",
  slug: "image-8ee22464ea47b35e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of two young enchantresses, one with warm auburn hair and one raven-haired, locked in direct intimate eye contact with each other, subtle magical golden glow around them, ornate fantasy gowns, warm cinematic light, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80250011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
