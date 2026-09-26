import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD1b6e12f780d4cc5 = {
  id: "01a0c5f2-eb24-7d9f-b09f-fa427104be26",
  type: "page-type/image",
  slug: "image-d1b6e12f780d4cc5",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, leaning in a doorway, wearing a short plaid skirt and a fitted black turtleneck top, soft window light, 85mm portrait, fine fabric detail, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
