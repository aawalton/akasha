import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC281c01a30b02154 = {
  id: "019f58c1-aa88-7139-b6ea-842a09375e5b",
  type: "page-type/image",
  slug: "image-c281c01a30b02154",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude boxer woman with big red boxing gloves held up guarding her chest, gym spotlight, fierce playful stare, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1453109246,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
