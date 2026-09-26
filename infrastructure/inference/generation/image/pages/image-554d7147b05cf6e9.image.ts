import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image554d7147b05cf6e9 = {
  id: "01a0c5f3-9f6f-75a9-b84f-33621abd71c8",
  type: "page-type/image",
  slug: "image-554d7147b05cf6e9",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "competitive woman in a pleated tennis skirt and cropped polo, racket over her shoulder with a smirk, clay court in golden afternoon, photorealistic photograph, natural skin texture, film grain",
  seed: 1795938204,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
