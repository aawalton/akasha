import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3e4a2a65cbcc195f = {
  id: "01a0c5f4-03a4-7a16-8a95-2abf53b63f50",
  type: "page-type/image",
  slug: "image-3e4a2a65cbcc195f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic candid portrait of a beautiful young Norse woman leaning against the frame of a great wooden loom, arms loosely crossed, one eyebrow slightly raised, warm amused half-smile. Pale luminous skin, dark honey-bronze hair pinned up out of the way with loose strands at her temples, amber-brown eyes, rolled linen sleeves, wool thread wound at her wrist. Warm golden lamplight, ancient hall with tree roots and a stone well soft in the background, photoreal, head and shoulders",
  seed: 4103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
