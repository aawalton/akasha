import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE7e4d52b3f7cf438 = {
  id: "01a0c5f3-b3ca-7eb2-8cf2-9a76091383fc",
  type: "page-type/image",
  slug: "image-e7e4d52b3f7cf438",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "beautiful feminine woman with long wavy hair wearing only a loosened silk necktie, one arm across her chest, loft window light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 56504247,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
