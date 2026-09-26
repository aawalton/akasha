import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ef5d138a92f0025 = {
  id: "01a0c5f3-f003-7b9c-95fb-a36f471d4798",
  type: "page-type/image",
  slug: "image-9ef5d138a92f0025",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties in a light flowing summer sundress standing in a sunny meadow, gentle breeze moving the fabric, soft warm golden light, candid 85mm portrait, visible skin texture, natural colors",
  seed: 369242541,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
