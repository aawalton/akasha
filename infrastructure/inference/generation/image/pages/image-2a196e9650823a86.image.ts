import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2a196e9650823a86 = {
  id: "01a0c5f3-9f6e-78d1-86b0-c0f2de64ee31",
  type: "page-type/image",
  slug: "image-2a196e9650823a86",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a lively young kitsune fox girl with a slim petite frame, a lovely human girls face with soft smooth human features, small human nose, full human lips, light freckles, golden slit-pupil eyes, russet fox ears on top of her head and two fluffy russet fox tails with white tips, wavy auburn hair, curious warm smile, nude natural figure, sitting gracefully among red maple leaves in an autumn forest, warm low light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 903,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
