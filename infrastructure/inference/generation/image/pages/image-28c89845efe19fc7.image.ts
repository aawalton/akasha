import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image28c89845efe19fc7 = {
  id: "01a0c5f3-7a9c-7705-a9a9-3b515baa87df",
  type: "page-type/image",
  slug: "image-28c89845efe19fc7",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman sunbathing, lying on her stomach propped on her elbows on a striped blanket over grass, wearing a white bikini, looking toward the camera with a soft smile, soft warm afternoon light, 50mm photo, shallow depth of field, visible skin texture, photorealistic",
  seed: 254719795,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
