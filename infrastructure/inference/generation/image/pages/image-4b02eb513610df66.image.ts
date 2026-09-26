import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b02eb513610df66 = {
  id: "019f1838-e12c-71ad-8181-a343cf9f85f9",
  type: "page-type/image",
  slug: "image-4b02eb513610df66",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of a young elven woman with delicately pointed ears, very long straight silver-white hair worn in two twin tails framing her face, pale soft green eyes, fine youthful delicate features, fair skin, slim petite build, wearing a white mage mantle with gold and black trim over a high-collared off-white striped shirt. Her composed still face is just beginning to break: her eyes widen just slightly in quiet recognition, her lips barely parting on a caught breath, the faintest warmth of caring surfacing beneath the surprise as she truly sees the person before her. She looks directly at the viewer. Warm low golden late-afternoon sunlight, single soft source, long dying-gold light. Close chest-up portrait, leaning very slightly toward the viewer, intimate and quiet, plain softly blurred background, no props, no action. Cinematic, natural realistic skin texture, shallow depth of field, highly detailed realism.",
  seed: 70040011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
