import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCb4186fcaa7e7efe = {
  id: "01a0c5f3-b3ca-725b-a147-7c56554edd71",
  type: "page-type/image",
  slug: "image-cb4186fcaa7e7efe",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman with a bath towel caught mid-slip off her body, one hand loosely holding it at the hip, steamy warm bathroom, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 270613251,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
