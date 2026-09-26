import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0d40d59dcceae805 = {
  id: "01a0c5f3-b3ca-7e51-9ceb-87affda0c767",
  type: "page-type/image",
  slug: "image-0d40d59dcceae805",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding an ornate birdcage with a white dove before her chest, fairytale window light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1166588015,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
