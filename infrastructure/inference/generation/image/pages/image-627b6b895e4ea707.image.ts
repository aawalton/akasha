import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image627b6b895e4ea707 = {
  id: "01a0c5f2-eb24-727d-9da0-9753e02de0b6",
  type: "page-type/image",
  slug: "image-627b6b895e4ea707",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in the kitchen offering a spoonful of food toward the viewer to taste, warm playful smile, steam and warm light, 35mm, candid domestic, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
