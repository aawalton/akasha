import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image01466c6dd92d80be = {
  id: "01a0c5f3-8d0f-77e6-ac9f-e76477c8b6c5",
  type: "page-type/image",
  slug: "image-01466c6dd92d80be",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "auburn-haired woman in a backless emerald silk gown, back to camera glancing over her shoulder, rooftop terrace at dusk, city lights bokeh, photorealistic photograph, natural skin texture, film grain",
  seed: 2033056264,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
