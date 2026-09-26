import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBba0f40fca73b121 = {
  id: "019f5890-30c5-70f2-bf20-886484d16a2d",
  type: "page-type/image",
  slug: "image-bba0f40fca73b121",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a giant monstera leaf across her torso, tropical greenhouse light, dewy skin, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 520936378,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
