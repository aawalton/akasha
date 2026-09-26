import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image81b2a416da35f437 = {
  id: "019f5a4a-be13-7054-978c-21c9072984dc",
  type: "page-type/image",
  slug: "image-81b2a416da35f437",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only a long cathedral wedding veil cascading over her body, sheer tulle catching soft chapel light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1760786550,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
