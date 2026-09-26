import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6af504ba1e68438b = {
  id: "019f1837-f0f7-793a-970a-0649827bd491",
  type: "page-type/image",
  slug: "image-6af504ba1e68438b",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "turn her head to look three-quarters to her left, same face and expression, keep everything else identical",
  seed: 1764759683,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
