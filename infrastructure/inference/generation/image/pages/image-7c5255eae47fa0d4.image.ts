import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7c5255eae47fa0d4 = {
  id: "01a0c5f3-b3ca-74ee-8c10-2813596432aa",
  type: "page-type/image",
  slug: "image-7c5255eae47fa0d4",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "retro nude woman hugging a large striped beach ball, vintage pin-up smile, sunny poolside, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2092962920,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
