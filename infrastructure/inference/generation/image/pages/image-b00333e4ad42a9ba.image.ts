import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB00333e4ad42a9ba = {
  id: "01a0c5f3-9f6c-7ea2-92f7-ef0f68d53052",
  type: "page-type/image",
  slug: "image-b00333e4ad42a9ba",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude baker woman holding a wooden tray of fresh croissants at chest height, flour-dusted cheeks, bakery warmth, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1561857986,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
