import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB2e101a2157163cf = {
  id: "01a0c5f3-9f6c-711b-a889-5e4dda9af8a8",
  type: "page-type/image",
  slug: "image-b2e101a2157163cf",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an open bright yellow rain slicker with nothing beneath, wet hair, rain-streaked window light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2002013584,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
