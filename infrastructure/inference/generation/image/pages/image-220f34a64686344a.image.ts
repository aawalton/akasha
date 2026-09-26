import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image220f34a64686344a = {
  id: "01a0c5f2-eb22-7130-ba31-d11b33a91342",
  type: "page-type/image",
  slug: "image-220f34a64686344a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and an oversized loose sweater slipping off one shoulder, leaning on the back of a couch, cozy lamplight, soft smile toward the viewer, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
