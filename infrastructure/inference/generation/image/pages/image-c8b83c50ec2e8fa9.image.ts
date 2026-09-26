import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC8b83c50ec2e8fa9 = {
  id: "019f5874-a2af-71f6-a5bd-4a4c15626358",
  type: "page-type/image",
  slug: "image-c8b83c50ec2e8fa9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a soaked white t-shirt clinging translucent to her skin, water dripping, dramatic side light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1064302539,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
