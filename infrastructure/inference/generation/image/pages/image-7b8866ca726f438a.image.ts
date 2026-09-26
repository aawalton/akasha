import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7b8866ca726f438a = {
  id: "01a0c5f3-b3c9-749f-bd5e-53b6d214c5dd",
  type: "page-type/image",
  slug: "image-7b8866ca726f438a",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "warm freckled woman in a champagne satin chemise sitting cross-legged on a bed with a coffee mug, genuine laugh, sunlit Sunday-morning bedroom, photorealistic photograph, natural skin texture, film grain",
  seed: 1958253318,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
