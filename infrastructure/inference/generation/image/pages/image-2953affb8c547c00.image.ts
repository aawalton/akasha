import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2953affb8c547c00 = {
  id: "01a0c5f3-b3c8-7596-b6b2-83ab96e8c309",
  type: "page-type/image",
  slug: "image-2953affb8c547c00",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a wide embroidered silk obi belt wrapped around her torso, kyoto tatami room, paper-screen light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 197477970,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
