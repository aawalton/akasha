import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2dcbc1d4465c768c = {
  id: "01a0c5f3-db28-73ef-ad5a-616c2c20ae9c",
  type: "page-type/image",
  slug: "image-2dcbc1d4465c768c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Two beautiful women together in a warm lamplit bedroom at evening, intimate and charged, sitting close and turned toward each other on the edge of a bed, knees nearly touching. LEFT woman: long loose auburn copper waves, fair freckled skin, pale green-hazel eyes, a cream linen sundress slipping off one shoulder, sun-warm and sovereign, an easy knowing smile, relaxed and confident. RIGHT woman: olive Mediterranean complexion, dark wavy hair, warm hazel-green eyes, a small closed-mouth knowing smile but a faint nervous flush, more reserved, hands folded. Soft golden lamplight, shallow depth of field, photoreal, cinematic, both faces clear and sharp, eye contact between them, sensual tension, tasteful, fully clothed.",
  seed: 70399899,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
