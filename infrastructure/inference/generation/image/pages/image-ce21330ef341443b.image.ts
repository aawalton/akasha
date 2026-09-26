import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe21330ef341443b = {
  id: "019f1837-f1bb-7d30-b8d0-629910ad3b2e",
  type: "page-type/image",
  slug: "image-ce21330ef341443b",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt: "tilt her chin up as if gazing at the sky, same face, keep everything else identical",
  seed: 491672288,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
