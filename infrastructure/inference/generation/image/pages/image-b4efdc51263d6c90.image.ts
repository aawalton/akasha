import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB4efdc51263d6c90 = {
  id: "01a0c5f3-8d0e-729c-8605-7b4f55c3c2af",
  type: "page-type/image",
  slug: "image-b4efdc51263d6c90",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman sunbathing, sitting up on a soft blanket on a grassy lawn, wearing a sheer coral lace shirt over a bikini bottom and round sunglasses, leaning back on her hands, warm golden-hour sunlight, three-quarter view, 85mm portrait, shallow depth of field, fine skin detail, photorealistic",
  seed: 130035189,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
