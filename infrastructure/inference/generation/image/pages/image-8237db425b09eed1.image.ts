import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8237db425b09eed1 = {
  id: "01a0c5f3-9f6b-7022-9993-24c009e55969",
  type: "page-type/image",
  slug: "image-8237db425b09eed1",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wrapped in a crisp white bedsheet draped like a Grecian toga off one shoulder, bare shoulder and leg, morning light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1577738030,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
