import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD1f44abe5ae49ce0 = {
  id: "01a0c5f2-f92e-77e8-80df-1f56000f03e2",
  type: "page-type/image",
  slug: "image-d1f44abe5ae49ce0",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "turn her head to look three-quarters to her left, same face and expression, keep everything else identical",
  seed: 1448683289,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
