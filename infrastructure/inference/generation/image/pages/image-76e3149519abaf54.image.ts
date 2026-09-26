import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image76e3149519abaf54 = {
  id: "01a0c5f2-eb25-7a3f-b8ff-6b17c65bdff1",
  type: "page-type/image",
  slug: "image-76e3149519abaf54",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing in front of a full-length mirror, wearing a black lace bra and panties set, soft side light, 85mm portrait, shallow depth of field, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
