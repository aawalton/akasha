import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image58f3f0ce77527a94 = {
  id: "019f58ad-b60f-71ff-b3a9-de17cdec7166",
  type: "page-type/image",
  slug: "image-58f3f0ce77527a94",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude sommelier woman holding two large red-wine glasses at chest height, wine-cellar candlelight, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1570101690,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
