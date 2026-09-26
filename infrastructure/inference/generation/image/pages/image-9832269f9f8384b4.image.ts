import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9832269f9f8384b4 = {
  id: "01a00f99-9fd7-7b8b-a6c9-06acdc4fbba5",
  type: "page-type/image",
  slug: "image-9832269f9f8384b4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Vast glaciated valley at dawn, braided river threading grey silt flats, low cloud caught halfway up the walls, one tiny orange tent for scale, large format landscape photograph, cold blue and umber\n",
  seed: 2145733421,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
