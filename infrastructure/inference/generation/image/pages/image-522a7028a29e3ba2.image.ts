import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image522a7028a29e3ba2 = {
  id: "019f1839-03fb-71f3-ba8f-129b29e7a7b9",
  type: "page-type/image",
  slug: "image-522a7028a29e3ba2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic candid portrait of two young brunette women in cozy autumn knitwear in a golden autumn forest, mid-laugh and warm together, soft dappled afternoon light, natural joyful mood, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80100011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
