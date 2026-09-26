import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image27c4e6cf12d7f999 = {
  id: "01a0c5f3-9f6f-7e80-86c5-47148be1c4ad",
  type: "page-type/image",
  slug: "image-27c4e6cf12d7f999",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties in a seated meditation pose on a yoga mat in a bright airy studio, eyes closed, calm and centered, soft natural light, candid 50mm portrait, visible skin texture",
  seed: 127112136,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
