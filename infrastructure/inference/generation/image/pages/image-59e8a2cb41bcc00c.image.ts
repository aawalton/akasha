import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image59e8a2cb41bcc00c = {
  id: "01a0c5f3-b3ca-74dd-aa41-fda63c33e7f2",
  type: "page-type/image",
  slug: "image-59e8a2cb41bcc00c",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only an open white lab coat, glasses pushed up in her hair, holding nothing, laboratory glass behind, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1558550132,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
