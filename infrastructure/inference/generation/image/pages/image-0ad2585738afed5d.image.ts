import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0ad2585738afed5d = {
  id: "01a0c5f3-b3cb-735c-ac37-3b418376650e",
  type: "page-type/image",
  slug: "image-0ad2585738afed5d",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman rock guitarist with a sunburst electric guitar, short dyed-black hair with one bleached streak, leather jacket, confident expression, dim concert stage with colored backlight, 85mm portrait, shallow depth of field, visible skin texture, photoreal",
  seed: 1727547753,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
