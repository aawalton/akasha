import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDe4867683a927a5c = {
  id: "01a0c5f3-f003-78dc-9fb5-0bd30ce32c7c",
  type: "page-type/image",
  slug: "image-de4867683a927a5c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties sunbathing on a striped beach towel on a grassy lawn, modest one-piece swimsuit, wide-brim sun hat, peaceful and content, bright clear daylight, natural skin texture, candid 35mm lifestyle photograph",
  seed: 1509079100,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
