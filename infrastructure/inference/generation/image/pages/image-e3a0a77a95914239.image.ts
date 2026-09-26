import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE3a0a77a95914239 = {
  id: "01a0c5f3-7a9c-75fa-858d-3974887e78d9",
  type: "page-type/image",
  slug: "image-e3a0a77a95914239",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "elegant woman in a floor-length red satin slip dress with cowl neckline, leaning against a doorway with a smoldering over-the-shoulder gaze, dim hotel corridor, warm lamplight, photorealistic photograph, natural skin texture, film grain",
  seed: 277173467,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
