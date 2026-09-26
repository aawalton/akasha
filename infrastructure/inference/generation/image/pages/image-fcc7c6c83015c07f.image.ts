import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFcc7c6c83015c07f = {
  id: "01a0c5f3-9f6b-7c51-b951-232189479447",
  type: "page-type/image",
  slug: "image-fcc7c6c83015c07f",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman draped in a length of translucent silk that clings and reveals, standing, ethereal studio light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 138087312,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
