import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFb719c0950f1e573 = {
  id: "01a0c5f3-b3c9-7e36-b55c-ce9feff666d9",
  type: "page-type/image",
  slug: "image-fb719c0950f1e573",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ohio personified as a beautiful young woman in her early twenties — chestnut hair loose, scarlet carnation pinned to a cream cardigan, buckeye tree branches overhead and rolling farmland with a distant city skyline behind her, warm midwestern afternoon light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1143645474,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
