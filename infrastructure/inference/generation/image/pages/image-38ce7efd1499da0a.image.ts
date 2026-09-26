import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image38ce7efd1499da0a = {
  id: "01a0c5f2-eb21-77ea-af81-a34c68b45214",
  type: "page-type/image",
  slug: "image-38ce7efd1499da0a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman outdoors in a red gingham sundress sitting on the grass in a sunny park, soft warm light, playful happy smile toward the viewer, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
