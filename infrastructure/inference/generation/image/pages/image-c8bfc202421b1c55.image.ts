import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC8bfc202421b1c55 = {
  id: "01a0c5f3-9f6c-7c4e-9e1a-a86b80a04290",
  type: "page-type/image",
  slug: "image-c8bfc202421b1c55",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "ballerina wearing only a white classical tutu at her waist, arms crossed gracefully over her chest, dance studio light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1721723732,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
