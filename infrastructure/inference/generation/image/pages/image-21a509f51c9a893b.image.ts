import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image21a509f51c9a893b = {
  id: "01a0c5f3-b3c8-7b4e-96a3-a1fe79253041",
  type: "page-type/image",
  slug: "image-21a509f51c9a893b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an oversized man's blazer worn on bare skin, lapels falling open, long bare legs, chic low light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1142577208,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
