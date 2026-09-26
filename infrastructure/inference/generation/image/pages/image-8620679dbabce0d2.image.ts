import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8620679dbabce0d2 = {
  id: "019f5a74-3ec0-7630-a651-54a41ac26fae",
  type: "page-type/image",
  slug: "image-8620679dbabce0d2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "playful woman wearing only leather lederhosen with the bib straps up over her bare chest, alpine meadow light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 166855627,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
