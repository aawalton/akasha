import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7e6097a7d158fc56 = {
  id: "01a0c5f3-9f6d-7a83-adbe-135056c0be54",
  type: "page-type/image",
  slug: "image-7e6097a7d158fc56",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait photograph of a beautiful young woman, 19 years old, youthful soft delicate features, long silver hair falling over bare shoulders, pale luminous skin, deep sultry bedroom eyes gazing at the camera, lips softly parted, kneeling and leaning in close on soft sheets, sensual curves, wearing a tiny minimal pale string bikini, warm dim candlelit intimate light, intensely seductive and tender, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 316,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
