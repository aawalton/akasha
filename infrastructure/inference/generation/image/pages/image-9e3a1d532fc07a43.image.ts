import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e3a1d532fc07a43 = {
  id: "01a0c5f3-9f6c-7118-90d8-7d95c266148b",
  type: "page-type/image",
  slug: "image-9e3a1d532fc07a43",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an open oversized hawaiian aloha shirt with nothing beneath, sunglasses pushed up, tiki bar sunset, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1835385907,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
