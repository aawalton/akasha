import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA2bb2332dbfe1c31 = {
  id: "01a0c5f3-8d0d-79ef-80d3-40c2d78e6741",
  type: "page-type/image",
  slug: "image-a2bb2332dbfe1c31",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait photograph of a beautiful young woman, 19 years old, youthful soft delicate features, long silver hair spread on the pillow, pale luminous skin, sultry gaze up at the camera, lips parted, lying back with a graceful sensual arch on soft white sheets, bare stomach and legs, wearing a small revealing pale bikini, warm dim candlelit intimate light, deeply seductive and inviting, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 318,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
