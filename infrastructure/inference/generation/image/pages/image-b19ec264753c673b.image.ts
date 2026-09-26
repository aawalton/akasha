import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB19ec264753c673b = {
  id: "019f589a-c30f-764f-834a-35a9f944beb2",
  type: "page-type/image",
  slug: "image-b19ec264753c673b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman wrapped in a flowing checkered racing flag, victory smile, motorsport garage light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 904541490,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
