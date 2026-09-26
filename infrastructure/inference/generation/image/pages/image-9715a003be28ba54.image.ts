import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9715a003be28ba54 = {
  id: "01a0c5f3-f003-7c34-9cf1-3307222f4f29",
  type: "page-type/image",
  slug: "image-9715a003be28ba54",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties in a white linen sundress on a seaside boardwalk at golden hour, sea breeze in her hair, warm soft light, candid lifestyle portrait, 85mm, visible skin texture",
  seed: 375575684,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
