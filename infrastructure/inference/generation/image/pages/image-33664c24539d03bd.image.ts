import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image33664c24539d03bd = {
  id: "01a0c5f3-9f6c-7906-bcb9-7c30827ab8fb",
  type: "page-type/image",
  slug: "image-33664c24539d03bd",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude hostess holding a silver tray with champagne flutes at chest height, art-deco party glow, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 416190416,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
