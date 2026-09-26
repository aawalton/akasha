import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBc84a8e0c64308af = {
  id: "01a0c5f3-8d0b-73e7-a3ac-9d48eecf2e56",
  type: "page-type/image",
  slug: "image-bc84a8e0c64308af",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman with soft warm-brown wavy hair and gentle warm hazel eyes, fair-to-warm skin, a soft genuine tender smile, looking directly and warmly at the viewer, soft golden window light, wearing a cozy cream knit sweater, quiet and gentle and kind, intimate and personal and present, calm soft-spoken warmth, shallow depth of field",
  seed: 735067647,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
