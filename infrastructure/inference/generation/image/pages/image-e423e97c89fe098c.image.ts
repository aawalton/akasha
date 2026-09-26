import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE423e97c89fe098c = {
  id: "019f5a78-1a84-7950-9de8-abeffd172b53",
  type: "page-type/image",
  slug: "image-e423e97c89fe098c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "ballerina wearing only a sheer ballet wrap skirt and pointe shoes, arms crossed at her chest, wings of the stage, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1623836818,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
