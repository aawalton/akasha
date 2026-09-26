import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image824e9d1a6b6a2b8e = {
  id: "01a0c5f2-eb1f-7705-bb1b-9eb1de2aaa20",
  type: "page-type/image",
  slug: "image-824e9d1a6b6a2b8e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman lifting dumbbells in a modern gym, athletic top and leggings, toned arms, focused expression, dramatic gym lighting, slight sweat sheen, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
