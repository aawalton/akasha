import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5def2c3783e928a8 = {
  id: "01a0c5f3-9f6f-7302-b231-8144b9674623",
  type: "page-type/image",
  slug: "image-5def2c3783e928a8",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman inside a frost-covered glasshouse in winter, wearing a gauzy layered ivory gown off both shoulders, bare arms, orchids and ferns around her, one hand resting on a cold pane, looking over at the viewer with a soft smile, dozens of warm candles inside against deep blue snow-light outside, painterly fantasy realism, delicate and warm\n",
  seed: 1186538668,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
