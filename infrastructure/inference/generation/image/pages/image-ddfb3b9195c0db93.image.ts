import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDdfb3b9195c0db93 = {
  id: "01a0c5f3-9f6d-71e2-95eb-1ecba6780f0e",
  type: "page-type/image",
  slug: "image-ddfb3b9195c0db93",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of a beautiful young elf woman, 20 years old, youthful soft sensual features, long silver-blonde hair slightly damp, soft pale sun-kissed skin, delicate pointed ears, warm light eyes, playful sensual smile, wearing a pale bikini, waist-deep in clear turquoise water, warm soft golden light, radiant and inviting, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 308,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
