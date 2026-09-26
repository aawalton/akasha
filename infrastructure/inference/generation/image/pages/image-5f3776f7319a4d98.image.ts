import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f3776f7319a4d98 = {
  id: "019f1905-3ec4-7d80-8abd-330e1d367dde",
  type: "page-type/image",
  slug: "image-5f3776f7319a4d98",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait, chest-up, of an ageless, ethereally beautiful young Caucasian woman with clear pale fair skin, long dark hair, and soft red lips, at a threshold in deep blue-violet twilight. She holds a small lantern low at her side, glowing warm gold against the dusk — modest, not dominant. Her irises glow with luminous golden lantern-light, alive and warm against the cool dusk. Her expression is serene and full of quiet compassion; her gaze ancient, steady, unflinching, kind. Cinematic, photoreal, natural pale skin texture, soft melancholy, the feeling of being gently led through the dark.",
  seed: 206,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
