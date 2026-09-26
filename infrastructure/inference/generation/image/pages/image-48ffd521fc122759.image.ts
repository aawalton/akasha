import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48ffd521fc122759 = {
  id: "01a0c5f3-b3c9-77a9-ba64-b976c69bce07",
  type: "page-type/image",
  slug: "image-48ffd521fc122759",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "exhilarated woman in a sleek racing swimsuit pulling off her cap and shaking her hair loose, pool deck with sparkling water light, photorealistic photograph, natural skin texture, film grain",
  seed: 904272731,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
