import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image454f3d03d8623e0c = {
  id: "01a0c5f3-9f6f-7681-bfa1-1288756d7b9d",
  type: "page-type/image",
  slug: "image-454f3d03d8623e0c",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two women in their twenties practicing yoga together on a beach at sunrise, yoga outfits, downward dog pose, calm ocean in the background, warm soft light, candid documentary photograph",
  seed: 620530046,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
