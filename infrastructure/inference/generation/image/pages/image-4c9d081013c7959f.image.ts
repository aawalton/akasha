import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4c9d081013c7959f = {
  id: "01a0c5f3-9f6a-7b96-9711-4d2d2141d529",
  type: "page-type/image",
  slug: "image-4c9d081013c7959f",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman standing in soft mist or steam, backlit, dreamlike diffusion, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1272639719,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
