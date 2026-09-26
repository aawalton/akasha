import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2bd3fb1909f01111 = {
  id: "01a0c5f3-8d0d-7e34-95bf-921224259176",
  type: "page-type/image",
  slug: "image-2bd3fb1909f01111",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate close portrait photograph of a beautiful young elf woman, 19 years old, youthful soft delicate features, long silver hair falling over her shoulders, pale luminous skin, delicate pointed ears, deep sultry bedroom eyes gazing at the camera, lips softly parted, sensual, seated close and leaning in, wearing a small pale bikini, warm dim candlelit intimate light, intensely seductive and tender, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 316,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
