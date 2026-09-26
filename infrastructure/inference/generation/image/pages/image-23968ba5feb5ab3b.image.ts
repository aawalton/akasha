import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image23968ba5feb5ab3b = {
  id: "01a0c5f3-8d10-7868-8e67-9bb81a8a86b4",
  type: "page-type/image",
  slug: "image-23968ba5feb5ab3b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman standing in a doorway, backlit, form in soft shadow, one hand on the frame, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 540017872,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
