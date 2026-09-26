import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image68558d9547937c36 = {
  id: "01a0c5f2-eb21-7131-9f01-08d6138df44a",
  type: "page-type/image",
  slug: "image-68558d9547937c36",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a Santorini terrace with white buildings and blue domes, casual flowing sundress, bright Mediterranean light, serene happy smile, 35mm, travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
