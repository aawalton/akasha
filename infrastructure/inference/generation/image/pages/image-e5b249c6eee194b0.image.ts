import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE5b249c6eee194b0 = {
  id: "019f5809-3f05-7a73-8ecd-90ef8eeecf95",
  type: "page-type/image",
  slug: "image-e5b249c6eee194b0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "joyously roaring artist in a white slip covered in wet paint splatters mid-throw of pigment, chaotic studio, photorealistic photograph, natural skin texture, film grain",
  seed: 1696487271,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
