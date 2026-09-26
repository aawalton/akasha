import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8bee5d0220e43a7 = {
  id: "019f58bd-0726-7b32-a4fa-7e2153420c5d",
  type: "page-type/image",
  slug: "image-e8bee5d0220e43a7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude gardener woman holding a copper watering can and a trowel across her front, greenhouse morning, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2111982010,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
