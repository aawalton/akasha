import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image22e0c2ae80a9c5aa = {
  id: "01a0c5f3-8d0c-7040-822d-dda4d6e82e59",
  type: "page-type/image",
  slug: "image-22e0c2ae80a9c5aa",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "beautiful woman covering her bare chest with only her own long flowing hair swept forward, otherwise nude, soft studio light, artful and playful, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2038760811,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
