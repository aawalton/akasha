import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBf5c9dca5bcdde96 = {
  id: "01a0c5f3-9f6b-7090-a48f-c41f72ab05da",
  type: "page-type/image",
  slug: "image-bf5c9dca5bcdde96",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman just waking, half-covered by a duvet, tousled hair, soft eyes, tender dawn light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1608045007,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
