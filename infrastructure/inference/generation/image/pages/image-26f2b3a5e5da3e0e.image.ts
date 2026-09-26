import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image26f2b3a5e5da3e0e = {
  id: "01a0c5f3-b3c9-7fd4-8371-39b2cf6fafa5",
  type: "page-type/image",
  slug: "image-26f2b3a5e5da3e0e",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman with long dark hair swept forward to veil her breasts, seated with knees drawn up, soft grey studio light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 323384085,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
