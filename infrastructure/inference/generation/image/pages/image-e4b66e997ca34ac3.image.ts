import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE4b66e997ca34ac3 = {
  id: "01a0c5f3-b3c7-77a4-9b08-7b8613e00e56",
  type: "page-type/image",
  slug: "image-e4b66e997ca34ac3",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "sun-drunk woman in a white linen dress and sunhat holding a grape at the vine row, Tuscan afternoon gold, photorealistic photograph, natural skin texture, film grain",
  seed: 2139360629,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
