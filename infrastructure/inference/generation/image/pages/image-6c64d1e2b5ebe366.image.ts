import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c64d1e2b5ebe366 = {
  id: "019f1839-4ca0-713a-ba6c-217cd74ff475",
  type: "page-type/image",
  slug: "image-6c64d1e2b5ebe366",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of an ethereal young woman made of luminous stardust, her skin a soft swirl of glowing nebula in violet and gold, hair flowing like a stream of shimmering star-motes, eyes like two small galaxies, calm definite delicate features, cosmic primordial beauty, chest-up, dark starry background, cinematic lighting, sharp focus, high detail",
  seed: 202,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
