import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0176e6a90cf75bc1 = {
  id: "01a0c5f2-eb25-7b93-93e5-bee83af7cc07",
  type: "page-type/image",
  slug: "image-0176e6a90cf75bc1",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a lace bra, panties and garter set sitting at a vanity, fastening a strap, soft glamorous mirror light, focused intimate expression, 50mm, fine detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
