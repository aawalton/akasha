import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDd1ecd83b314d4eb = {
  id: "01a0c5f3-9f6c-7adf-b14d-6e30b2ed9b3d",
  type: "page-type/image",
  slug: "image-dd1ecd83b314d4eb",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a white vintage ruffled petticoat at her waist, arms crossed over her chest, attic window light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1756804455,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
