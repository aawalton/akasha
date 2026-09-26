import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image62fdf6d892ad4fa2 = {
  id: "01a0c5f3-9f6b-75ae-b070-288adadd54a2",
  type: "page-type/image",
  slug: "image-62fdf6d892ad4fa2",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a distinctive striking young woman just waking beside you in soft morning light, sleepy soft smile and warm half-lidded eyes meeting yours directly, tousled hair on the pillow, one bare shoulder above the blanket, natural real skin texture with imperfections, drowsy tender and deeply close, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 727519,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
