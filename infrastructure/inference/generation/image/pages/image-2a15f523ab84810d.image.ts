import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2a15f523ab84810d = {
  id: "01a0c5f3-9f6e-7941-9158-fb574756eb93",
  type: "page-type/image",
  slug: "image-2a15f523ab84810d",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a sweet young kitsune fox girl with a slim petite youthful figure, a lovely human girls face with soft smooth human features, small human nose, full human lips, light freckles, warm brown slit-pupil eyes, cream fox ears on top of her head and two fluffy cream fox tails, long pale-pink hair, gentle shy smile, nude natural figure, sitting gracefully beneath a blooming cherry tree with drifting petals, soft warm light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 906,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
