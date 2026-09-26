import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE557134bc1d52cf9 = {
  id: "01a0c5f3-b3ca-706c-8a1a-03ab1b1cfe78",
  type: "page-type/image",
  slug: "image-e557134bc1d52cf9",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a men's silk pajama shirt buttoned at one button, tousled hair, soft sunday morning bed, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 403413688,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
