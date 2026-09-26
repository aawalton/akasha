import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d59607b6da8f418 = {
  id: "01a0c5f3-9f6b-7b85-bef0-3a61db15e29f",
  type: "page-type/image",
  slug: "image-1d59607b6da8f418",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an open robe sitting on the edge of the bed, hair down, gentle morning glow on her skin, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 85654559,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
