import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1babdfe6a6c227f9 = {
  id: "019f58bb-5910-76a3-9713-01f12717949f",
  type: "page-type/image",
  slug: "image-1babdfe6a6c227f9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude street musician woman playing an accordion across her torso, Parisian café light, laughing eyes, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1960043907,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
