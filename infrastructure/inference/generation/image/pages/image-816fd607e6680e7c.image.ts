import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image816fd607e6680e7c = {
  id: "01a0c5f3-9f6f-78d8-bb5f-6538e2ca8e78",
  type: "page-type/image",
  slug: "image-816fd607e6680e7c",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fine-art reclining odalisque nude seen from behind, curve of waist and hip, warm painterly tone, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1399659371,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
