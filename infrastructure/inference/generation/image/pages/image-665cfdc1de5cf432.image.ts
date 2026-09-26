import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image665cfdc1de5cf432 = {
  id: "01a0c5f3-8d0f-77b0-8aa7-f04ad9590b3c",
  type: "page-type/image",
  slug: "image-665cfdc1de5cf432",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman lying on her side beneath a white linen sheet draped low across her hips, soft morning light, one arm folded under her head, serene half-smile, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1754529562,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
