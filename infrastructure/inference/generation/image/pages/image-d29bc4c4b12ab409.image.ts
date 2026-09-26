import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD29bc4c4b12ab409 = {
  id: "01a0c5f3-8d0e-7144-85ac-dace7ee09d41",
  type: "page-type/image",
  slug: "image-d29bc4c4b12ab409",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "shy bride in white lace lingerie and a long veil, seated on a windowsill with a soft downward smile, bright airy suite, photorealistic photograph, natural skin texture, film grain",
  seed: 1192656227,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
