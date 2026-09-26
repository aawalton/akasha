import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA0b1f85edd1a26d6 = {
  id: "01a0c5f3-9f6c-748b-a860-8dd736716cae",
  type: "page-type/image",
  slug: "image-a0b1f85edd1a26d6",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only an open black graduation gown and cap, diploma held at her side, campus golden hour, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1555994521,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
