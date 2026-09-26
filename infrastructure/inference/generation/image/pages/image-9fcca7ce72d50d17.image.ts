import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9fcca7ce72d50d17 = {
  id: "01a095f5-ada6-7000-a0a6-b0ca08772070",
  type: "page-type/image",
  slug: "image-9fcca7ce72d50d17",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "a single grey pebble on white paper",
  seed: 778,
  steps: 4,
  width: 256,
  height: 256,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
