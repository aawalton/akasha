import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f14d8d96e6de873 = {
  id: "01a0c5f3-8d0c-7085-992e-0e6ee970d53a",
  type: "page-type/image",
  slug: "image-0f14d8d96e6de873",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a barely-there sheer mesh bodystocking, form fully visible through it, editorial studio light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1231677483,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
