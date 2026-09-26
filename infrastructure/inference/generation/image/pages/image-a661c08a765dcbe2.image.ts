import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA661c08a765dcbe2 = {
  id: "01a0c5f2-eb25-7e18-8cfa-7d508ad8e74c",
  type: "page-type/image",
  slug: "image-a661c08a765dcbe2",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, lounging on a couch, wearing a navy lace bra and panties, soft evening light, 85mm portrait, shallow depth of field, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
