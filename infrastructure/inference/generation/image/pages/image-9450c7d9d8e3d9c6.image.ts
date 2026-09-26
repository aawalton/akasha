import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9450c7d9d8e3d9c6 = {
  id: "01a0c5f3-9f6d-720d-997d-3e9a5a4674cf",
  type: "page-type/image",
  slug: "image-9450c7d9d8e3d9c6",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic sensual portrait photograph of a beautiful young elf woman, 19 years old, youthful delicate fine-boned features, long silver hair, pale luminous skin with a soft glisten, delicate pointed ears, sultry warm gaze with a teasing playful smile, looking over her shoulder, graceful sensual body, wearing a small pale bikini, reclining near soft warm light, intimate seductive and playful, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 314,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
