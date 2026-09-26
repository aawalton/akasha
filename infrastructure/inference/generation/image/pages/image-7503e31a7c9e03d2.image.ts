import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7503e31a7c9e03d2 = {
  id: "01a0c5f3-8d0c-75a3-ba9d-52f5146c929f",
  type: "page-type/image",
  slug: "image-7503e31a7c9e03d2",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cheeky nude woman holding a flat pizza box across her middle, one eyebrow raised, late-night kitchen glow, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1414804114,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
