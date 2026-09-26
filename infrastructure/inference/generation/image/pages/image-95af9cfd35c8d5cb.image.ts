import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95af9cfd35c8d5cb = {
  id: "01a0c5f3-7a9c-7499-acff-ea9d35bb3598",
  type: "page-type/image",
  slug: "image-95af9cfd35c8d5cb",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude silhouette of a woman behind a sheer lace curtain, form softened and abstracted, backlit window, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1795091173,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
