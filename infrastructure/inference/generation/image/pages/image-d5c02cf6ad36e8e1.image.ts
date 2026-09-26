import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD5c02cf6ad36e8e1 = {
  id: "01a0c5f2-eb25-78d7-80b7-4b5d7e01c86c",
  type: "page-type/image",
  slug: "image-d5c02cf6ad36e8e1",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a delicate satin slip standing on a sunny balcony doorway with a coffee, soft golden morning light, calm content smile, breeze in the fabric, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
