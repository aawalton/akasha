import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB7c6496ed86b73b5 = {
  id: "01a0c5f2-eb25-7ae2-96db-18d884cbe56f",
  type: "page-type/image",
  slug: "image-b7c6496ed86b73b5",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing in a sunlit kitchen in the morning, wearing just an oversized white t-shirt, bare legs, holding a coffee mug, 85mm portrait, soft window light, visible skin texture, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
