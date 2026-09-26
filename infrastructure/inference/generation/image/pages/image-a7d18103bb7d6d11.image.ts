import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA7d18103bb7d6d11 = {
  id: "01a0c5f3-7a9c-7b05-baaa-4a5d5e06b211",
  type: "page-type/image",
  slug: "image-a7d18103bb7d6d11",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in sheer white cotton underwear and an open unbuttoned shirt, soft belly and hip, bright airy bedroom, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2113369580,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
