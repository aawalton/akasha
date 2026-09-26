import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAca4dea2c76a2d8f = {
  id: "01a0c5f3-b3c8-78f5-9c51-97708e0eee62",
  type: "page-type/image",
  slug: "image-aca4dea2c76a2d8f",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a cropped chunky cream turtleneck sweater, bare below, knees together seated on a stool, studio light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1963737893,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
