import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e532980b8266f13 = {
  id: "01a0c5f3-9f6d-7029-94c1-7acdcf9fe2c5",
  type: "page-type/image",
  slug: "image-9e532980b8266f13",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of a beautiful young elf woman, 18 years old, youthful soft innocent yet sensual features, long straight platinum-white hair, flawless pale porcelain skin, delicate pointed ears, striking pale ice-blue eyes, soft alluring gaze, wearing a white bikini, standing in a soft-lit garden of white flowers, gentle diffused light, delicate and sensual, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 307,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
