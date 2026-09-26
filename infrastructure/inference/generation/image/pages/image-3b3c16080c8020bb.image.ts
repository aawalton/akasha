import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3b3c16080c8020bb = {
  id: "01a0c5f3-9f6a-7416-9d8b-0379626f116d",
  type: "page-type/image",
  slug: "image-3b3c16080c8020bb",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a bubble bath, bare shoulders and one knee above the foam, relaxed head-back pose, candlelight, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2018209795,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
