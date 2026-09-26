import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD32db7e940cb19f3 = {
  id: "01a0c5f3-b3c9-7ed5-8883-4e45869196df",
  type: "page-type/image",
  slug: "image-d32db7e940cb19f3",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Oregon personified as a beautiful young woman in her early twenties — auburn hair loose under a wool beanie, olive rain jacket, Oregon grape sprig in hand, mossy Douglas fir forest and a misty rugged Pacific sea stack coastline behind her, soft rain-washed silver light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1167881294,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
