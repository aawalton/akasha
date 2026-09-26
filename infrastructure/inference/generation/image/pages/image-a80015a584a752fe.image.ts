import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA80015a584a752fe = {
  id: "01a0c5f3-7a9c-7672-ade1-0d25629d548a",
  type: "page-type/image",
  slug: "image-a80015a584a752fe",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman lit only by candlelight, warm highlights on her curves, deep shadows, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 565783608,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
