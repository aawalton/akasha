import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6b0e0edf6f9d5e6b = {
  id: "01a0c5f3-b3c8-7965-bf13-66863fa6b736",
  type: "page-type/image",
  slug: "image-6b0e0edf6f9d5e6b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an unzipped ski jacket with nothing beneath, goggles pushed up, snowflakes falling, bright alpine light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 7782286,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
