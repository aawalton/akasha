import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD8fc9245652503ea = {
  id: "019f1839-0844-75f9-b1bf-c4ff011c52c5",
  type: "page-type/image",
  slug: "image-d8fc9245652503ea",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic three-quarter-length intimate portrait of two young women lovers a breath apart, a pause as they gaze at each other's lips about to kiss, tasteful bare skin and luminous nude shoulders, one platinum-blonde and one rose-gold, pale luminous skin, soft pastel light, breathless tender longing, sensual and ethereal, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80350011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
