import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB693608951176d1a = {
  id: "01a0c5f3-b3c9-75ed-8ec4-09a709222056",
  type: "page-type/image",
  slug: "image-b693608951176d1a",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art nude reclining with a sheer sheet half-covering the legs, rest of the body bare, painterly softness, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1161070392,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
