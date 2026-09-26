import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb9415cfc6e12cfa = {
  id: "019f1837-1637-7268-b430-124b70bc889c",
  type: "page-type/image",
  slug: "image-ab9415cfc6e12cfa",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "tilt her head slightly down with her eyes lowered as if reading, same face, keep everything else identical",
  seed: 535788348,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
