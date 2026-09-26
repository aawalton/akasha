import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image527409bb59c43dc0 = {
  id: "019f5879-3450-7d72-a8ba-06bc52d0eb42",
  type: "page-type/image",
  slug: "image-527409bb59c43dc0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a soaked white t-shirt clinging translucent to her skin, water dripping, dramatic side light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 396959050,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
