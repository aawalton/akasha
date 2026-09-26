import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image99f59d1048c24cf1 = {
  id: "01a0c5f3-f003-70f5-b6c2-1f50d67abd51",
  type: "page-type/image",
  slug: "image-99f59d1048c24cf1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties tanning on a sun lounger on a grassy lawn, one-piece swimsuit, eyes closed and peaceful, soft warm golden-hour light, serene mood, 85mm candid portrait, visible skin texture",
  seed: 761724981,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
