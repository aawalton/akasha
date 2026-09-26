import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image886cd4887299de59 = {
  id: "01a0c5f3-b3cc-7f7c-82da-0495e13a433c",
  type: "page-type/image",
  slug: "image-886cd4887299de59",
  grade: "S-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman in a candlelit stone bath chamber of an old castle, sitting on the wide rim wrapped loosely in dark fur, wet hair, steam rising off the water, dozens of candles and one high arrow-slit of blue dawn, direct steady gaze, painterly fantasy realism, warm gold against cold stone\n",
  seed: 1675583294,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
