import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image648f42b488b0cde9 = {
  id: "01a0c5f3-7a9c-7d6b-b593-04c5f6cb6344",
  type: "page-type/image",
  slug: "image-648f42b488b0cde9",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a matching delicate bralette and high-cut panties, stretching languidly, soft window backlight, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 609077374,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
