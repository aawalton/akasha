import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFdba8a82b9018d0e = {
  id: "01a0c5f2-f92e-7e23-8531-01b39ffce1c1",
  type: "page-type/image",
  slug: "image-fdba8a82b9018d0e",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt: "give her a gentle soft smile, same face, keep everything else identical",
  seed: 2020773277,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
