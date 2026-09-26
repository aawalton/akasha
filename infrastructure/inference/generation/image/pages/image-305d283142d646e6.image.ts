import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image305d283142d646e6 = {
  id: "01a0c5f2-f92e-74b2-805c-cd670284fbf2",
  type: "page-type/image",
  slug: "image-305d283142d646e6",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt: "close her eyes serenely, same face, keep everything else identical",
  seed: 1007122907,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
