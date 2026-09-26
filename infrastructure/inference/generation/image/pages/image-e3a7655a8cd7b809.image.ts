import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE3a7655a8cd7b809 = {
  id: "01a0c5f2-eb23-7e1f-9e10-dc5c208c9654",
  type: "page-type/image",
  slug: "image-e3a7655a8cd7b809",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime academy witch, pointed hat and school robe with a broom, magical academy courtyard, cheerful curious expression, soft daylight, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
