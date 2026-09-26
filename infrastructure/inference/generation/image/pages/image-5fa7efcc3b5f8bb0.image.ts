import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5fa7efcc3b5f8bb0 = {
  id: "01a0c5f3-b3ca-753e-bf1e-acf075a73ae9",
  type: "page-type/image",
  slug: "image-5fa7efcc3b5f8bb0",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only an oversized football jersey sliding off one shoulder, game-day face paint stripe, stadium light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1440933905,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
