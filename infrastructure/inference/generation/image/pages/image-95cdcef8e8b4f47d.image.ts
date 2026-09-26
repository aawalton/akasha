import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95cdcef8e8b4f47d = {
  id: "01a0c5f3-8d0c-73ab-961f-1ddddbc9ac78",
  type: "page-type/image",
  slug: "image-95cdcef8e8b4f47d",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman twirling a paper parasol angled across her body, rain-glow street light, wet hair, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1552903422,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
