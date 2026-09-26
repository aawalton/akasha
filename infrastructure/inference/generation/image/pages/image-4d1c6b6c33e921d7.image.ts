import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4d1c6b6c33e921d7 = {
  id: "01a0c5f2-eb24-7d72-a501-0ad886ded17a",
  type: "page-type/image",
  slug: "image-4d1c6b6c33e921d7",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman washing dishes at the kitchen sink, sleeves rolled up, looking over with a relaxed smile, warm afternoon light through the window, soft suds, 35mm, candid domestic, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
