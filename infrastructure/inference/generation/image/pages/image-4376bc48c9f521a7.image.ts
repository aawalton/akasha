import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4376bc48c9f521a7 = {
  id: "01a0c5f2-eb22-74c5-8f44-04488c9b11f9",
  type: "page-type/image",
  slug: "image-4376bc48c9f521a7",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose draped tank, standing on a sunny balcony with a coffee, soft golden morning light, calm content smile toward the viewer, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
