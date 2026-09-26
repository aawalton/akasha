import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE873a39f9fe7e68a = {
  id: "01a0c5f3-b3ca-7ff0-b02e-bf8ecf2cebc7",
  type: "page-type/image",
  slug: "image-e873a39f9fe7e68a",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close portrait of a beautiful young woman with a vivid mischievous personality, one eyebrow raised, a knowing crooked half-smirk, staring straight down the lens directly into your eyes with unmistakable direct eye contact, bright pale sea-green eyes sharp and in focus locked challengingly and invitingly on you, tousled wind-messed chestnut hair, natural real skin texture with light freckles, casual worn soft t-shirt, warm moody indoor light, shallow depth of field with soft bokeh, candid alive and unposed, a real person with genuine attitude meeting your gaze, close intimate framing",
  seed: 887301,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
