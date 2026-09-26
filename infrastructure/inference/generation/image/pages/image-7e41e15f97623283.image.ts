import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7e41e15f97623283 = {
  id: "01a0c5f3-b3ca-7a4a-8276-79ac93d9b868",
  type: "page-type/image",
  slug: "image-7e41e15f97623283",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman cradling an armful of rustic baguettes and sourdough loaves, market-morning smile, bakery light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 173449266,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
