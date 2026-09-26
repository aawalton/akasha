import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6dc80766d0654d0a = {
  id: "01a0c5f3-b3c8-72f3-80fd-cc67f6c1af02",
  type: "page-type/image",
  slug: "image-6dc80766d0654d0a",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "over-the-glasses look from a woman in a pencil skirt and half-unbuttoned blouse carrying a stack of books, golden library light, photorealistic photograph, natural skin texture, film grain",
  seed: 1598190173,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
