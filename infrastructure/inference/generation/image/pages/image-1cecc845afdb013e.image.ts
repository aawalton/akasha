import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1cecc845afdb013e = {
  id: "01a0c5f3-b3cb-7179-b70a-79cbc15b48a4",
  type: "page-type/image",
  slug: "image-1cecc845afdb013e",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful English woman in a Regency conservatory at night, thin white muslin gown lit through from behind by a roaring hearth so her figure reads clearly through it, ribbon under the bust, auburn hair half fallen from its pins, curled in a wicker chair with a book forgotten in her lap, looking up at the viewer with quiet mischief, candles and glass panes, painterly realism\n",
  seed: 1172961982,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
