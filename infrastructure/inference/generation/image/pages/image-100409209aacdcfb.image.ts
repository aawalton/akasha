import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image100409209aacdcfb = {
  id: "01a0c5f3-9f6c-773c-bd30-45e807c89be9",
  type: "page-type/image",
  slug: "image-100409209aacdcfb",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a little black dress unzipped and sliding off both shoulders, caught at her elbows, city apartment night light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 901739868,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
