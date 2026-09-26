import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image039b99c31b9f9c2c = {
  id: "01a00fd8-9890-79bf-98b7-7b1b346b2e3c",
  type: "page-type/image",
  slug: "image-039b99c31b9f9c2c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman on a solarpunk rooftop garden at sunrise, loose sheer green linen wrap lit through by the low sun, standing barefoot on warm terracotta between tomato vines and solar canopies, one hand brushing a leaf, glancing over at the viewer with an easy grin, glass towers and hanging greenery beyond, painterly realism, fresh golden light\n",
  seed: 647883643,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
