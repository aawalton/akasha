import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA0c1dd22cccfd469 = {
  id: "01a0c5f3-7a9c-7235-b600-8851ca7575fc",
  type: "page-type/image",
  slug: "image-a0c1dd22cccfd469",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Very attractive young woman in her early twenties as a hedge witch in her candlelit cottage on an autumn night, unlaced linen bodice and a short wool skirt with bare legs, chestnut hair loose, sitting on the table edge among dried herbs and jars with a black cat beside her, holding a glowing vial, looking at the viewer with a knowing smile, warm candle and hearth light, painterly fantasy realism, cosy and enchanted\n",
  seed: 350974268,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
