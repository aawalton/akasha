import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7519a8dc3cd3b4fa = {
  id: "019f58a0-0355-7afc-a1e0-09345abc2f0c",
  type: "page-type/image",
  slug: "image-7519a8dc3cd3b4fa",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding an armful of tall sunflowers covering her front, bright summer smile, field light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 445503210,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
