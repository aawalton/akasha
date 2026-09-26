import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD6c15ede5d408225 = {
  id: "01a0c5f3-b3c8-702c-b348-d6adcfea7a90",
  type: "page-type/image",
  slug: "image-d6c15ede5d408225",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three female friends in their twenties jogging on a forest trail together, running clothes, smiling, dappled sunlight through the trees, candid 35mm sports photograph, sense of motion",
  seed: 396712864,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
