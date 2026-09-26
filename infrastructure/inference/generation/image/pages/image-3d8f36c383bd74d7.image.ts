import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d8f36c383bd74d7 = {
  id: "01a0c5f3-f003-7847-bbe8-58fc01eb831d",
  type: "page-type/image",
  slug: "image-3d8f36c383bd74d7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties tanning on a sun lounger beside a swimming pool, modest one-piece swimsuit, sunglasses, relaxed and content, bright midday sun, candid 35mm lifestyle photograph, visible skin texture, natural colors",
  seed: 1188730391,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
