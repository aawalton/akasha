import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image07dda9191453280c = {
  id: "01a0c5f2-f92e-7cc7-99af-e51d912743b6",
  type: "page-type/image",
  slug: "image-07dda9191453280c",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "turn her head to look three-quarters to her right, same face, keep everything else identical",
  seed: 495025747,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
