import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAdef38469b8ac9b0 = {
  id: "01a0c5f3-9f6c-7a2b-b216-c0602f2a0ab6",
  type: "page-type/image",
  slug: "image-adef38469b8ac9b0",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude traveler woman holding a large unfolded paper map across her front, wanderlust grin, hostel window light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 106692756,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
