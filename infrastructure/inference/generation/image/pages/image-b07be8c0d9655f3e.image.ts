import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB07be8c0d9655f3e = {
  id: "019f5a64-f216-7282-88c5-26d0b7de5f78",
  type: "page-type/image",
  slug: "image-b07be8c0d9655f3e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a woven alpaca poncho, bare legs and shoulders peeking, andean market colors, warm daylight, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 446160349,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
