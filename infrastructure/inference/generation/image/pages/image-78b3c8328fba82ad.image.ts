import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image78b3c8328fba82ad = {
  id: "01a0c5f3-b3c8-7aea-b888-a52af7f0eb9e",
  type: "page-type/image",
  slug: "image-78b3c8328fba82ad",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close portrait of a distinctive striking young woman giving you a playful knowing teasing smile, one corner of her mouth lifted, warm bright eyes locked on yours with direct eye contact and mischief, relaxed and still, loose hair, casual cute top, warm cozy indoor light, natural real skin texture with imperfections, flirtatious alive and fun, shallow depth of field with soft bokeh, close intimate framing",
  seed: 209476,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
