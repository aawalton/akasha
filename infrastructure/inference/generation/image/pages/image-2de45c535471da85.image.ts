import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2de45c535471da85 = {
  id: "019f202c-6495-76d1-8966-7c9811d8f928",
  type: "page-type/image",
  slug: "image-2de45c535471da85",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait photograph of a beautiful young elf woman, 19 years old, youthful soft delicate features, long silver hair, pale luminous skin with a soft glisten, delicate pointed ears, sultry half-lidded bedroom gaze, lips parted in a soft teasing smile, leaning closer toward the camera, sensual seated pose on soft sheets, wearing a small pale bikini, warm dim intimate low light, deeply seductive and inviting, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 314,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
