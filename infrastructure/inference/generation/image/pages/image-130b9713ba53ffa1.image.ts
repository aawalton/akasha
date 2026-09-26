import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image130b9713ba53ffa1 = {
  id: "01a0c5f2-f92e-7ea6-ae29-029f10166adb",
  type: "page-type/image",
  slug: "image-130b9713ba53ffa1",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "tilt her head slightly to one side with a curious expression, same face, keep everything else identical",
  seed: 125931492,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
