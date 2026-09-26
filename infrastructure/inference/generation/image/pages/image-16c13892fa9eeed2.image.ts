import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image16c13892fa9eeed2 = {
  id: "019f1838-dffc-7f3e-8299-8a0deb8c5acb",
  type: "page-type/image",
  slug: "image-16c13892fa9eeed2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of a young elven woman with delicately pointed ears, very long straight silver-white hair worn in two twin tails framing her face, pale soft green eyes, fine youthful delicate features, fair skin, slim petite build, wearing a white mage mantle with gold and black trim over a high-collared off-white striped shirt. Her face stays quiet and unreadably calm, yet her eyes are warm and glassy with held-back feeling, a near-smile that has not yet reached her mouth. She looks directly and softly at the viewer, present and attentive, the gentle wondering look of someone truly seeing the person before her. Warm low golden late-afternoon sunlight, single soft source, long dying-gold light. Close chest-up portrait, leaning very slightly toward the viewer, intimate and quiet, plain softly blurred background, no props, no action, perfectly still. Cinematic, natural realistic skin texture, shallow depth of field, highly detailed realism.",
  seed: 70020011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
