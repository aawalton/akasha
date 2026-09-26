import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7572b48ce3e9aab4 = {
  id: "01a0c5f3-8d0f-73dd-8b41-30140fdb88a1",
  type: "page-type/image",
  slug: "image-7572b48ce3e9aab4",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman in her early twenties in a candlelit vampire ballroom at midnight, sheer black lace gown with a long slit and a velvet choker, pale skin and dark red lips, raven hair swept up, pausing mid-dance to turn and look straight at the viewer with a slow smile, hundreds of candles and gilt mirrors, deep reds and blacks, painterly gothic fantasy realism\n",
  seed: 961341708,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
