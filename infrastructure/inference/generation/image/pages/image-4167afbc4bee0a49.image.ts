import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4167afbc4bee0a49 = {
  id: "01a0c5f3-b3ca-7394-bb75-4c9a0de78508",
  type: "page-type/image",
  slug: "image-4167afbc4bee0a49",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman wearing only a long sheer cathedral wedding veil over her bare shoulders and body, no dress, tulle softly blurring her bare skin, chapel light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 302011012,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
