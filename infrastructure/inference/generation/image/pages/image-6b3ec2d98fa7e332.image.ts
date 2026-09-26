import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6b3ec2d98fa7e332 = {
  id: "01a0c5f3-8d0e-73c4-9f02-da243d0a061e",
  type: "page-type/image",
  slug: "image-6b3ec2d98fa7e332",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman sunbathing, sitting up on a soft blanket on a grassy lawn, wearing a coral bikini and round sunglasses, leaning back on her hands, warm golden-hour sunlight, three-quarter view, 85mm portrait, shallow depth of field, fine skin detail, photorealistic",
  seed: 1704565090,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
