import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image359d77b01593eab4 = {
  id: "019f1839-064d-7940-a917-c8d550f6729b",
  type: "page-type/image",
  slug: "image-359d77b01593eab4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of two young women lovers sharing a tender kiss, one honey-blonde and one raven-haired, bare shoulders, warm golden backlight haloing their hair, soft and romantic, beautiful luminous skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80290011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
