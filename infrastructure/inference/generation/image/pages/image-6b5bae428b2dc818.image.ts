import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6b5bae428b2dc818 = {
  id: "01a0c5f3-8d0e-7911-99b5-0e86f8d63207",
  type: "page-type/image",
  slug: "image-6b5bae428b2dc818",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman sunbathing, lying on her stomach propped on her elbows on a striped blanket over grass, wearing a sheer white lace shirt over a bikini bottom, looking toward the camera with a soft smile, soft warm afternoon light, 50mm photo, shallow depth of field, visible skin texture, photorealistic",
  seed: 908639403,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
