import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC6dbd7111bf438a6 = {
  id: "01a0c5f3-b3c9-713d-b97c-f0cdbb2cc650",
  type: "page-type/image",
  slug: "image-c6dbd7111bf438a6",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman standing knee-deep in a slow river at dusk surrounded by thousands of fireflies, white cotton sundress soaked and clinging, holding the hem up, glancing back at the viewer with a gentle smile, soft golden points of light around her and warm haze on the water, delicate and graceful, painterly fantasy realism, dreamlike\n",
  seed: 1246478454,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
