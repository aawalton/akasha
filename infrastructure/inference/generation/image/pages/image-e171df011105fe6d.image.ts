import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE171df011105fe6d = {
  id: "019f58cc-b8d8-7182-a7a1-bee9be829e5f",
  type: "page-type/image",
  slug: "image-e171df011105fe6d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a huge snow globe at chest height, swirling snow inside, winter-window light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 327471135,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
