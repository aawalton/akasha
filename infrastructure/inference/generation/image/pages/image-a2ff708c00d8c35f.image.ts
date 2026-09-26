import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA2ff708c00d8c35f = {
  id: "01a0c5f3-9f6c-7384-8026-0d1e2b3de9c7",
  type: "page-type/image",
  slug: "image-a2ff708c00d8c35f",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a cotton sundress with both straps slipped off her shoulders, holding the bodice loosely at her bust, orchard light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 240880183,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
