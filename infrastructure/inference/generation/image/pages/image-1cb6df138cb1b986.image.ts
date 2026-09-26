import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1cb6df138cb1b986 = {
  id: "01a0c5f3-7a9c-783b-9aee-d068c3a01f2f",
  type: "page-type/image",
  slug: "image-1cb6df138cb1b986",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — luminous skin with a soft verdant green undertone, hair made of living green vines and leaves threaded with tiny wildflowers, a gown grown from soft moss and petals, dappled forest light, a warm playful expression, clear bright green eyes, delicately pointed fae ears, a warm tender expression, soft shallow depth of field, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 2002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
