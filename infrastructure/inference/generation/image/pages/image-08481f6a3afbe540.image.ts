import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image08481f6a3afbe540 = {
  id: "01a0c5f3-b3c8-7fa3-b29f-a14096277d3c",
  type: "page-type/image",
  slug: "image-08481f6a3afbe540",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Michigan personified as a beautiful young woman in her early twenties — strawberry-blonde hair loose, denim jacket with a cherry-blossom sprig in hand, freshwater dunes and a red lighthouse on a Great Lakes shore behind her, clear blue lake-summer light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1943370118,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
