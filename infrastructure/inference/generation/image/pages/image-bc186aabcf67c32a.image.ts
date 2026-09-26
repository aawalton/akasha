import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBc186aabcf67c32a = {
  id: "01a0c5f3-b3c9-7fbc-9b2a-af88c1346aaa",
  type: "page-type/image",
  slug: "image-bc186aabcf67c32a",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman behind a floating panel of organza, form glimpsed through the sheer fabric, dreamlike, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 378996653,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
