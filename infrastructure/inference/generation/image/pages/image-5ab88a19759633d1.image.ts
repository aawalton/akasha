import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5ab88a19759633d1 = {
  id: "019f1837-f103-7b7d-bcb5-ea180b8cbaa2",
  type: "page-type/image",
  slug: "image-5ab88a19759633d1",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "turn her head to a near-profile view facing left, same face, keep everything else identical",
  seed: 532555261,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
