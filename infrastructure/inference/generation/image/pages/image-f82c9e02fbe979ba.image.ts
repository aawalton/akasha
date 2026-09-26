import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF82c9e02fbe979ba = {
  id: "01a0c5f2-eb21-76ff-b9b4-9c98e50a2a11",
  type: "page-type/image",
  slug: "image-f82c9e02fbe979ba",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman outdoors in a flowing floral sundress standing in a sunny meadow, light breeze lifting the hem, warm golden light, radiant relaxed smile toward the viewer, 35mm, shallow depth of field, fine fabric movement, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
