import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image612ccc581e120af7 = {
  id: "01a0c5f3-b3c9-75dd-afba-e41de0d5243f",
  type: "page-type/image",
  slug: "image-612ccc581e120af7",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman seen from behind seated on rumpled sheets, glancing back over her shoulder, warm skin, dawn light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 363666411,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
