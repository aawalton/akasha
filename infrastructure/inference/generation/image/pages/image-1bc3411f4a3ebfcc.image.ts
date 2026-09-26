import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1bc3411f4a3ebfcc = {
  id: "01a0c5f3-b3c8-78d6-9b71-8a2cafa9a66b",
  type: "page-type/image",
  slug: "image-1bc3411f4a3ebfcc",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman behind a glowing neon OPEN sign held at chest height, pink-blue light on her skin, night bar mood, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 184074515,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
