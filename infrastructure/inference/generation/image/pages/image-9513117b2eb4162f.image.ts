import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9513117b2eb4162f = {
  id: "01a0c5f3-f003-7339-bef0-c46eb9a34e61",
  type: "page-type/image",
  slug: "image-9513117b2eb4162f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties reclining on the grass in a leafy city park on a sunny afternoon, casual t-shirt and denim shorts, reading a paperback book, dappled sunlight through trees, candid 50mm documentary photograph, natural skin texture",
  seed: 2138479349,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
