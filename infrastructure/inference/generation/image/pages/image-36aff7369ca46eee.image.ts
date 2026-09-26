import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image36aff7369ca46eee = {
  id: "01a0c5f3-9f6f-7da6-94b0-019b2c417cb2",
  type: "page-type/image",
  slug: "image-36aff7369ca46eee",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Stunningly beautiful young woman with long honey-blonde hair, lying back on white linen in a sunlit room, one arm above her head, soft cotton slip dress, warm morning light through sheer curtains, dreamy expression, flawless skin, editorial fashion photography, 85mm, shallow depth of field\n",
  seed: 473869027,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
