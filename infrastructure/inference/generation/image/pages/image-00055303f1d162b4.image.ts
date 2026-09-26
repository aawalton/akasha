import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image00055303f1d162b4 = {
  id: "01a0c5f3-9f6d-7813-b662-c588b4bf2381",
  type: "page-type/image",
  slug: "image-00055303f1d162b4",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of a beautiful young elf woman, 20 years old, youthful soft features, long silver-blonde hair, pale sun-kissed skin, delicate pointed ears, warm playful sultry eyes, teasing smile, glancing back over her shoulder, wearing a small pale bikini, soft warm golden light, playful and seductive, sensual, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 312,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
