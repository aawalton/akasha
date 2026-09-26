import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEcdac24f912b46bc = {
  id: "019f1838-e0de-7f7c-9a5b-29611686e651",
  type: "page-type/image",
  slug: "image-ecdac24f912b46bc",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of a young elven woman with delicately pointed ears, very long straight silver-white hair worn in two twin tails framing her face, pale soft green eyes, fine youthful delicate features, fair skin, slim petite build, wearing a white mage mantle with gold and black trim over a high-collared off-white striped shirt. Her face is composed and still, almost deadpan, but her eyes have gone soft and faintly bright at the very threshold of tears without crying, the barest tenderness surfacing through a calm surface. She looks directly and softly at the viewer, present and attentive, the gentle wondering look of someone truly seeing the person before her. Warm low golden late-afternoon sunlight, single soft source, long dying-gold light. Close chest-up portrait, leaning very slightly toward the viewer, intimate and quiet, plain softly blurred background, no props, no action, perfectly still. Cinematic, natural realistic skin texture, shallow depth of field, highly detailed realism.",
  seed: 70010011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
