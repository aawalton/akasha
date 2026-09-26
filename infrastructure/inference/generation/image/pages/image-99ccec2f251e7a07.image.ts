import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image99ccec2f251e7a07 = {
  id: "01a0c5f3-b3cb-7c05-bf75-2baefe4a0bf8",
  type: "page-type/image",
  slug: "image-99ccec2f251e7a07",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two women in their twenties jogging together along a tree-lined trail, running gear, chatting as they run, soft morning light, candid documentary sports photograph, depth of field",
  seed: 1435671300,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
