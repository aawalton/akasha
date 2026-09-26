import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8b1d4879d7fb084e = {
  id: "01a0c5f3-7a9b-73c4-8994-5d24159ae505",
  type: "page-type/image",
  slug: "image-8b1d4879d7fb084e",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "smoldering latina woman in a plunging red lace bodysuit, reclined on a velvet sofa with one arm behind her head, moody crimson-lit parlor, photorealistic photograph, natural skin texture, film grain",
  seed: 1875464091,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
