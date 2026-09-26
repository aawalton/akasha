import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFa993524cbf15817 = {
  id: "01a0c5f2-f92e-71f1-8bb1-1e20b727d519",
  type: "page-type/image",
  slug: "image-fa993524cbf15817",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "make her laugh warmly with a bright open smile, same face, keep everything else identical",
  seed: 1969041396,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
