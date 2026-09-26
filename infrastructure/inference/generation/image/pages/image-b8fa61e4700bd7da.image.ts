import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB8fa61e4700bd7da = {
  id: "019f1839-0337-714d-b997-7b3a13e01b27",
  type: "page-type/image",
  slug: "image-b8fa61e4700bd7da",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic dramatic portrait of two striking young women in their twenties, one with a platinum-blonde pixie cut and bold striking features, the other with long dark wavy hair and dark eyes, moody evening light with soft rim lighting, confident expressions, elegant and cinematic, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80040011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
