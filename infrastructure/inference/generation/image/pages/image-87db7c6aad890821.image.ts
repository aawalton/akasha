import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image87db7c6aad890821 = {
  id: "01a0c5f3-9f6d-7427-a3af-f8f763a56402",
  type: "page-type/image",
  slug: "image-87db7c6aad890821",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young woman on a dark beach at night under a glowing green and violet aurora, soft otherworldly natural light on her face, warm direct eye contact and a quiet awed delighted smile shared with you, loose windblown hair, cozy wrap, natural real skin texture, magical intimate and alive, shallow depth of field with soft bokeh, close framing",
  seed: 459102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
