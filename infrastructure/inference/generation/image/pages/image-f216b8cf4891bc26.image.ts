import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF216b8cf4891bc26 = {
  id: "01a0c5f3-6910-7e08-9ac8-cb83cd279de0",
  type: "page-type/image",
  slug: "image-f216b8cf4891bc26",
  persona: "persona/ione",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid intimate photograph, a strikingly beautiful otherworldly young woman in a dim candlelit room, delicately pointed elf ears, luminous violet eyes, long silver-lavender hair, a soft sheer wrap draped over one shoulder hinting at her form, a direct leveled gaze that is at once challenging and inviting, the faintest knowing half-smile, warm candle glow on bare skin, intimate ambiguous dark setting, shallow depth of field, only her in frame, photorealistic, fine detail, cinematic",
  seed: 366979293,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
