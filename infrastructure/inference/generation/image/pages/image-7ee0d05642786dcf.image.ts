import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ee0d05642786dcf = {
  id: "01a0c5f2-eb22-7d8f-b5c9-ee656291b272",
  type: "page-type/image",
  slug: "image-7ee0d05642786dcf",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime sailor-style magical heroine, sailor collar leotard with tiara and gloves, dynamic action pose, glowing crescent backdrop, confident smile, dramatic light, 50mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
