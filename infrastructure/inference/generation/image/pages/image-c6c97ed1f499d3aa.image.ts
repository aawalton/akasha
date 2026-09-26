import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC6c97ed1f499d3aa = {
  id: "01a0c5f3-9f6d-7b62-b54d-af5ea3b72076",
  type: "page-type/image",
  slug: "image-c6c97ed1f499d3aa",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of a strikingly beautiful young elf woman, 18 years old, youthful fresh soft delicate features, long silver-blonde hair, luminous pale skin, delicate pointed ears, large soft grey eyes, gentle parted lips, sensual inviting gaze looking at camera, wearing a simple pale ivory bikini, soft warm dawn light, intimate and tender, relaxed natural pose, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 305,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
