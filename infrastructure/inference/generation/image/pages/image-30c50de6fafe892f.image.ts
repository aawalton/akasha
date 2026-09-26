import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image30c50de6fafe892f = {
  id: "01a0c5f3-9f6c-708a-8e5a-289382890b1b",
  type: "page-type/image",
  slug: "image-30c50de6fafe892f",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only men's silk boxer shorts, arms crossed over her bare chest, playful smirk, apartment morning, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1798696927,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
