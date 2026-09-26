import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5431cbde72258142 = {
  id: "01a0c5f3-9f6b-7489-a2af-9e42884b04d3",
  type: "page-type/image",
  slug: "image-5431cbde72258142",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a distinctive striking young woman in soft warm evening light, wearing a loosely draped sheer wrap that suggests rather than reveals, relaxed and leaning close to you, warm eyes meeting yours directly with a soft inviting calm, tousled dark hair, natural real skin texture with imperfections, intimate sensual and tender, shallow depth of field with soft bokeh, close waist-up framing",
  seed: 660347,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
