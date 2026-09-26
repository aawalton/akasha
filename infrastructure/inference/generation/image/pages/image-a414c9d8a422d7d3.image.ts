import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA414c9d8a422d7d3 = {
  id: "01a0c5f3-9f6c-7692-b000-bf5285ebb496",
  type: "page-type/image",
  slug: "image-a414c9d8a422d7d3",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only an open black leather biker jacket on bare skin, zippers glinting, tousled hair, urban night light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 92193101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
