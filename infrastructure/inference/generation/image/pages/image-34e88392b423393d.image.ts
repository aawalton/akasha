import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image34e88392b423393d = {
  id: "019f58c6-ff2a-7c89-b11c-b62e529ae247",
  type: "page-type/image",
  slug: "image-34e88392b423393d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman washing a classic car, holding a giant soapy sponge and bucket, suds flying, summer driveway, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 350274751,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
