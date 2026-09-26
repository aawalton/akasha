import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb47cf731f825b66 = {
  id: "01a0c5f3-f003-7fc8-a908-a528c3950533",
  type: "page-type/image",
  slug: "image-ab47cf731f825b66",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties reclining on a wooden deck tanning in the sun, swimsuit, applying sunscreen to her arm, bright daylight, natural skin texture, candid 50mm documentary photograph",
  seed: 71207617,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
