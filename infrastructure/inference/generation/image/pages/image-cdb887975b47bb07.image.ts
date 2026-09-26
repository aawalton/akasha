import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCdb887975b47bb07 = {
  id: "01a0c5f3-9f6a-7363-8fb7-f3b16966e5f1",
  type: "page-type/image",
  slug: "image-cdb887975b47bb07",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman stretching in bed in warm morning light, arms overhead, sheets pooled at her hips, blissful, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 377921938,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
