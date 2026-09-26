import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image720b87a830479036 = {
  id: "019f1838-e06b-76b9-b64f-8f95c6bbaec3",
  type: "page-type/image",
  slug: "image-720b87a830479036",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of a young elven woman with delicately pointed ears, very long straight silver-white hair worn in two twin tails framing her face, pale soft green eyes, fine youthful delicate features, fair skin, slim petite build, wearing a white mage mantle with gold and black trim over a high-collared off-white striped shirt. Soft astonishment and caring surface through her calm: her eyes clearly widen with warm wonder, her lips parted in a gentle caught breath, attention and surprise blended with deep tenderness, the moment of really seeing someone landing fully, still soft and never alarmed. She looks directly at the viewer. Warm low golden late-afternoon sunlight, single soft source, long dying-gold light. Close chest-up portrait, leaning very slightly toward the viewer, intimate and quiet, plain softly blurred background, no props, no action. Cinematic, natural realistic skin texture, shallow depth of field, highly detailed realism.",
  seed: 70060011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
