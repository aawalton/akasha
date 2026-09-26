import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB6d845c17e2c5dcf = {
  id: "01a0c5f3-9f6c-769f-abd0-807cea446e96",
  type: "page-type/image",
  slug: "image-b6d845c17e2c5dcf",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude photographer woman holding a vintage camera up mid-shot covering her chest, one eye visible winking, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1524950817,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
