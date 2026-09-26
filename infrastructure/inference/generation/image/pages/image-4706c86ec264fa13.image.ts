import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4706c86ec264fa13 = {
  id: "01a0c5f2-eb1f-7b37-9b28-06754527fd8f",
  type: "page-type/image",
  slug: "image-4706c86ec264fa13",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a cozy stay-in movie date, casual hoodie and shorts, curled on the couch with popcorn, soft warm lamplight, relaxed happy smile toward the viewer, 50mm, shallow depth of field, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
