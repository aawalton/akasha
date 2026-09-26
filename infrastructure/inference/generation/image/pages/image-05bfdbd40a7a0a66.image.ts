import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image05bfdbd40a7a0a66 = {
  id: "01a0c5f3-b3c8-7bc6-af38-5c1b8f13f0a4",
  type: "page-type/image",
  slug: "image-05bfdbd40a7a0a66",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties jogging along a park path on a sunny morning, athletic leggings and a tank top, hair in a ponytail, mid-stride, candid 35mm sports photograph, sense of motion, natural light, visible skin texture",
  seed: 572318210,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
