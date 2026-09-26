import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d3607a41a40aede = {
  id: "01a0c5f3-f003-7aaa-9b61-dc5eb77c2183",
  type: "page-type/image",
  slug: "image-1d3607a41a40aede",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a group of adult women in their twenties relaxing together on the grass in a park on a warm summer day, casual summer outfits, a picnic spread with fruit and drinks nearby, warm sunlight, candid photoreal lifestyle photograph, depth of field",
  seed: 1920404480,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
