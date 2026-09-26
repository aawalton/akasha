import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb94736232961e71 = {
  id: "01a0c5f3-9f6d-7af6-b0af-6cad4274f443",
  type: "page-type/image",
  slug: "image-ab94736232961e71",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait photograph of a beautiful young elf woman, 19 years old, youthful soft delicate features, long silver-blonde hair, luminous pale skin, delicate pointed ears, large soft eyes, sultry half-lidded bedroom gaze, lips slightly parted, wearing a small pale bikini, reclining on soft white sheets, warm low intimate lighting, seductive and tender, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 309,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
