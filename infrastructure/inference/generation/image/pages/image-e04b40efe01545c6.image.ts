import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE04b40efe01545c6 = {
  id: "01a0c5f2-eb23-754e-bb02-4b03581f31f3",
  type: "page-type/image",
  slug: "image-e04b40efe01545c6",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime samurai girl, lightweight armor over a short kimono, twin swords, windswept hair, dramatic battlefield sky, fierce expression, dramatic light, 35mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
