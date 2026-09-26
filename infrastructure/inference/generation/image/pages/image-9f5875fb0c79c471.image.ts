import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9f5875fb0c79c471 = {
  id: "019f1839-019c-7879-a86e-9b2033cf1024",
  type: "page-type/image",
  slug: "image-9f5875fb0c79c471",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two young women, one honey-blonde and one raven-haired, foreheads close together sharing a tender private moment, warm golden backlight haloing their hair, soft and intimate, beautiful luminous skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80140011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
