import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f97b783916694ae = {
  id: "01a0c5f3-8d0e-7007-9789-5fee13dfdc09",
  type: "page-type/image",
  slug: "image-0f97b783916694ae",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in an intricate black lace bodysuit, one hand on her hip, confident stance, moody studio light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 937544229,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
