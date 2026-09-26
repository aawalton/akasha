import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDe764702f25c0d39 = {
  id: "01a0c5f2-eb24-7882-8c44-ff001c5d7230",
  type: "page-type/image",
  slug: "image-de764702f25c0d39",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing in a cozy room, wearing a short corduroy skirt and a snug knit top, warm lamp light, 85mm portrait, shallow depth of field, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
