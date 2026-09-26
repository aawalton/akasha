import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9786b34003db9955 = {
  id: "019f1839-09d4-7d6e-9ee7-25eb23e6b239",
  type: "page-type/image",
  slug: "image-9786b34003db9955",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of two young women lovers at the peak of breathless longing, lips a hair apart and eyes half-closed, hands drawing each other close, bare luminous skin, ethereal magical glow around them, one fair silver-blonde and one dark chestnut, otherworldly and intensely sensual, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80400011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
