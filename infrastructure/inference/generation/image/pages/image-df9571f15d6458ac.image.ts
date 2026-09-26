import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDf9571f15d6458ac = {
  id: "01a0c5f3-9f6c-79e1-98ee-2cff18587997",
  type: "page-type/image",
  slug: "image-df9571f15d6458ac",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a large glowing paper lantern at chest height below her chin, both eyes visible above it looking at the camera, warm light on her face, night garden, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 65665325,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
