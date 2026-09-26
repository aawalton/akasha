import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEda1b655f5bc830d = {
  id: "019f1838-77c5-7740-97bd-e233f1bb97fb",
  type: "page-type/image",
  slug: "image-eda1b655f5bc830d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a South Asian woman with warm medium-brown skin, glossy dark hair, soft tender direct gaze, gentle genuine smile, warm soft window light, modern soft feminine clothing in jewel tones, deeply present and kind, intimate and personal, shallow depth of field",
  seed: 1253986563,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
