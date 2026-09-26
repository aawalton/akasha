import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE51ba20260b757fb = {
  id: "019f2036-7fc5-764b-b52d-af23655b0f78",
  type: "page-type/image",
  slug: "image-e51ba20260b757fb",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait photograph of a beautiful young woman, 19 years old, youthful soft delicate features, long silver hair, pale luminous skin with a soft glisten, sultry half-lidded bedroom gaze, lips parted in a soft teasing smile, leaning close toward the camera, sensual pose on soft sheets, bare shoulders and stomach, wearing a very small revealing pale micro bikini, warm dim candlelit intimate light, deeply seductive and alluring, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 314,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
