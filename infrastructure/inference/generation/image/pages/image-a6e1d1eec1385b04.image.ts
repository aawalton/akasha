import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA6e1d1eec1385b04 = {
  id: "01a0c5f3-b3ca-76ba-8d94-acedc9f1506c",
  type: "page-type/image",
  slug: "image-a6e1d1eec1385b04",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a pleated cheerleading skirt, arms crossed over her chest, gymnasium light, high ponytail, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1163332066,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
