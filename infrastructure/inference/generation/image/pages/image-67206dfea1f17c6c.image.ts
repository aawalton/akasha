import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image67206dfea1f17c6c = {
  id: "01a0c5f3-8d10-7696-95b0-11f8767f035b",
  type: "page-type/image",
  slug: "image-67206dfea1f17c6c",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude figure behind a billowing sheer curtain lit by evening light, abstract and soft, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1671421429,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
