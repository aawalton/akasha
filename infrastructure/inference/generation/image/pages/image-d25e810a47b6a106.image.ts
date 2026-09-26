import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD25e810a47b6a106 = {
  id: "019f58c2-7d7e-715f-ad2b-80c5ef24ba3b",
  type: "page-type/image",
  slug: "image-d25e810a47b6a106",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude athlete woman holding a basketball at her chest and another at her hip, arena light, confident grin, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 8647823,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
