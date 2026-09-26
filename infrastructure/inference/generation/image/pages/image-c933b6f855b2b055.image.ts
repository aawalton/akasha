import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC933b6f855b2b055 = {
  id: "01a0c5f2-eb1f-7dd0-8091-4d4d4eeb19e0",
  type: "page-type/image",
  slug: "image-c933b6f855b2b055",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman doing a seated forward stretch on a yoga mat by a sunlit window, serene focused expression, soft morning light, fitted activewear, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
