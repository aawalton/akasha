import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE012762c685611ce = {
  id: "01a0c5f3-9f6d-73db-90db-538f2804a009",
  type: "page-type/image",
  slug: "image-e012762c685611ce",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait photograph of a beautiful young woman, 19 years old, youthful soft delicate features, long soft platinum-blonde hair, fair luminous skin, sultry warm gaze with a teasing smile, leaning close in a sensual seated pose on soft sheets, wearing a small pale bikini, warm dim candlelit intimate light, deeply seductive and inviting, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 317,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
