import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95ded653d526c4d0 = {
  id: "019f1836-d9ba-727b-bcf1-8cf5bdc5efa5",
  type: "page-type/image",
  slug: "image-95ded653d526c4d0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a light cotton summer yukata with a colorful obi, at an evening festival with paper lanterns glowing behind her, warm light, gentle joyful smile, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
