import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0c3acc74b836025b = {
  id: "01a0c5f3-7a9c-7b4b-97b6-0068887d3972",
  type: "page-type/image",
  slug: "image-0c3acc74b836025b",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic soft portrait of a pretty young woman with wavy auburn red hair and light freckles, wearing an oversized cream knit sweater, sitting by a sunlit window in a cozy room, gentle natural window light, warm and serene expression, 85mm, fine natural skin detail",
  seed: 1904660856,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
