import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBfaa1369ff3d3190 = {
  id: "01a0c5f3-b3c9-7509-8920-bb967781b623",
  type: "page-type/image",
  slug: "image-bfaa1369ff3d3190",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman classical violinist in an elegant dark dress, smooth dark hair pinned up, holding a violin under her chin, poised serene expression, ornate concert hall background, 85mm portrait, soft golden stage light, visible skin texture, photoreal",
  seed: 416315308,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
