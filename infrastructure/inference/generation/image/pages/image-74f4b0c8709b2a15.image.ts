import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image74f4b0c8709b2a15 = {
  id: "01a0c5f3-b3c9-7751-82ee-f22a7d8c4a33",
  type: "page-type/image",
  slug: "image-74f4b0c8709b2a15",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "intimate portrait of a woman with wet hair and beaded water on her bare shoulders, soft daylight, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 778401809,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
