import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ab8e7dcd18840bc = {
  id: "01a0c5f3-9f6c-78c2-afe6-90a76e491728",
  type: "page-type/image",
  slug: "image-9ab8e7dcd18840bc",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an open vintage fur coat with nothing beneath, night city lights behind, glamorous low light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2050023441,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
