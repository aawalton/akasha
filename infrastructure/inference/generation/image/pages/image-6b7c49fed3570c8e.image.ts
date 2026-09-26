import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6b7c49fed3570c8e = {
  id: "019f58cb-89e3-7951-9bad-c2798d093b97",
  type: "page-type/image",
  slug: "image-6b7c49fed3570c8e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a large carved glowing pumpkin before her chest, orange candle glow, autumn night, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1593812597,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
