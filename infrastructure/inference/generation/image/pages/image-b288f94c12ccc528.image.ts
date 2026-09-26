import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB288f94c12ccc528 = {
  id: "019f58b3-01fe-7579-b211-f61769f40fae",
  type: "page-type/image",
  slug: "image-b288f94c12ccc528",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude painter woman peeking around a canvas on an easel, brush in teeth, mischievous eyes, atelier light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1163858744,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
