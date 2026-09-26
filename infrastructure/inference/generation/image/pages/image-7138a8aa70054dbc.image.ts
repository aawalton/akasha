import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7138a8aa70054dbc = {
  id: "01a0c5f4-1913-70e6-9157-310038a7f3ae",
  type: "page-type/image",
  slug: "image-7138a8aa70054dbc",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "a single grey pebble on white paper",
  seed: 777,
  steps: 4,
  width: 256,
  height: 256,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
