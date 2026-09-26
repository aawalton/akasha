import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBb1f7539a7c63682 = {
  id: "01a0c5f3-8d0e-77ac-9cae-f934b5bde560",
  type: "page-type/image",
  slug: "image-bb1f7539a7c63682",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a distinctive striking young woman with a specific memorable face, warm freckled skin, tousled copper hair, one bare shoulder, resting close to you in soft warm morning light, warm eyes meeting yours directly with soft delight and contentment, natural real skin texture with imperfections, a deeply close warm intimate moment, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 318640,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
