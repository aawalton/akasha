import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC9246bf179f0161f = {
  id: "019f28db-b4ff-7828-b01f-bfa817c3fe47",
  type: "page-type/image",
  slug: "image-c9246bf179f0161f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to waist, of a petite small-framed young woman in her mid-twenties with a compact athletic build, perched forward on a boulder, elbows on knees, head tilted with a cocky lopsided smirk, one eyebrow up — supremely confident, teasing. Long black hair loosely gathered, strands over her brow. Pale grey eyes, softly unfocused, just past the camera. Wearing a simple wrapped linen breast-band in warm clay tones, bare stomach, bare arms, a thin braided leather cord at her throat. Golden late light, scattered rocks and dust behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6701,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
