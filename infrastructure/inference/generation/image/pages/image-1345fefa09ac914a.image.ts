import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1345fefa09ac914a = {
  id: "01a0c5f3-9f6a-7e44-ba73-8d4f0060cb12",
  type: "page-type/image",
  slug: "image-1345fefa09ac914a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman from behind with wet hair, water running down her back, glistening skin, warm light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 33939411,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
