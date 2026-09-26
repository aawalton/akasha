import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image911b4ec9b52cb84e = {
  id: "01a0c5f3-8d0d-7bb4-b0b6-f9a0f95316e8",
  type: "page-type/image",
  slug: "image-911b4ec9b52cb84e",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a lingerie model in her late twenties standing waist-deep where a waterfall hits the pool, drenched, wet lingerie, arms raised, dramatic water spray and mist, editorial fashion glamour photograph, 85mm, dramatic natural light",
  seed: 747179966,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
