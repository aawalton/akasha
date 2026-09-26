import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image01475cb6fadfad2a = {
  id: "01a0c5f3-9f6c-7640-b793-b2e8bc804c1c",
  type: "page-type/image",
  slug: "image-01475cb6fadfad2a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman kneeling behind a low table holding a teapot mid-pour, steam rising, zen morning light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1903732227,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
