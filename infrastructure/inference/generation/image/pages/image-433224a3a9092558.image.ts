import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image433224a3a9092558 = {
  id: "01a0c5f3-9f6b-7e96-8791-3ef785a4e352",
  type: "page-type/image",
  slug: "image-433224a3a9092558",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an unbuttoned oversized denim shirt hanging open down the center, bare beneath, casual daylight, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1610000743,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
