import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image10ec304fbd806ca4 = {
  id: "019f1839-0a95-7b72-a840-99cf29b90365",
  type: "page-type/image",
  slug: "image-10ec304fbd806ca4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two fairy lovers with iridescent translucent wings reclining tangled together among glowing wildflowers, tasteful bare luminous skin, one platinum-blonde and one rose-gold, a breath apart with hands drawing close, soft magical glowing motes drifting in warm light, sensual and ethereal, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80460011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
