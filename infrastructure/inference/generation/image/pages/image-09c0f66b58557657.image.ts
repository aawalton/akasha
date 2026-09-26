import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image09c0f66b58557657 = {
  id: "01a0c5f3-9f6c-79db-b8a1-c7bfb1e81ff0",
  type: "page-type/image",
  slug: "image-09c0f66b58557657",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman hugging an enormous teddy bear covering her torso, playful innocence, soft bedroom light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2062682103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
