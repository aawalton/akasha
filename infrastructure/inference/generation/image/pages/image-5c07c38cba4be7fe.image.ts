import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5c07c38cba4be7fe = {
  id: "01a0c5f3-7a9c-73cd-9fe0-f7debb47242e",
  type: "page-type/image",
  slug: "image-5c07c38cba4be7fe",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "softly startled woman in an empire-waist muslin gown looking up from her book on a garden bench, English rose garden light, photorealistic photograph, natural skin texture, film grain",
  seed: 1669920094,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
