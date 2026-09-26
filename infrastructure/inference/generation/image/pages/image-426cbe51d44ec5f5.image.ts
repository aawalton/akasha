import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image426cbe51d44ec5f5 = {
  id: "019f5876-4569-7195-9351-8b12a3b62db0",
  type: "page-type/image",
  slug: "image-426cbe51d44ec5f5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an oversized man's blazer worn on bare skin, lapels falling open, long bare legs, chic low light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 913588590,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
