import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCd77aac749b8cf4c = {
  id: "01a0c5f3-8d0b-710d-9934-6557c8a1cc81",
  type: "page-type/image",
  slug: "image-cd77aac749b8cf4c",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic very intimate close portrait of a distinctive striking young woman with a specific memorable face, warm tan freckled skin, sun-streaked brown hair, resting close to you in soft warm light, warm hazel eyes meeting yours directly with soft delight and contentment, simple crisp white top, natural real skin texture with imperfections, deeply close warm and intimate, shallow depth of field with soft bokeh, very close intimate framing",
  seed: 405882,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
