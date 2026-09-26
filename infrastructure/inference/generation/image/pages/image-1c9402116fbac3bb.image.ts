import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1c9402116fbac3bb = {
  id: "01a0c5f3-7a9c-7106-946e-0f5842c728ff",
  type: "page-type/image",
  slug: "image-1c9402116fbac3bb",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wearing only an oversized man's dress shirt half-unbuttoned, bare legs, sitting on the edge of a bed, morning light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 26874206,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
