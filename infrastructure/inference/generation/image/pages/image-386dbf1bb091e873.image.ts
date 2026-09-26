import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image386dbf1bb091e873 = {
  id: "01a0c5f3-9f6b-7ab8-a1be-7d2c53a67bba",
  type: "page-type/image",
  slug: "image-386dbf1bb091e873",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman with a single long satin ribbon wound in a spiral around her body, the ribbon the only covering, playful soft light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 824169807,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
