import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image59101cd0a6cbb27b = {
  id: "01a0c5f3-7a9c-727a-a164-f995f7e52768",
  type: "page-type/image",
  slug: "image-59101cd0a6cbb27b",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — delicately pointed fae ears, warm sun-kissed skin, coppery rose-gold hair catching the first light, amber eyes — a faerie of the dawn, wearing a softly draped blush-and-gold garment, warm rose-gold morning light and luminous skin, a kind radiant expression, soft shallow depth of field, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 1003,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
