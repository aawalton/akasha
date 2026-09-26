import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9505faeea0063e27 = {
  id: "01a0c5f2-eb1d-7a91-89fc-4d82250b6a0d",
  type: "page-type/image",
  slug: "image-9505faeea0063e27",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a voluminous white ball gown in a candlelit ballroom, soft romantic light, serene radiant smile, 50mm, shallow depth of field, fine tulle detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
