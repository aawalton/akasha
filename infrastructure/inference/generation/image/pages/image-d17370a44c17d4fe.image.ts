import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD17370a44c17d4fe = {
  id: "019f58d0-061b-76a3-b923-4a9d245d2ec8",
  type: "page-type/image",
  slug: "image-d17370a44c17d4fe",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude vintage woman carrying a tall stack of striped hatboxes covering her front, Parisian boutique light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 708019573,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
