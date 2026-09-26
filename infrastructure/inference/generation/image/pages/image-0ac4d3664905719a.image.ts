import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0ac4d3664905719a = {
  id: "01a0c5f2-eb23-7940-9839-2682e7c75ddc",
  type: "page-type/image",
  slug: "image-0ac4d3664905719a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime-style performer in a classic bunny outfit with ears, elegant confident pose, glamorous neon-lit lounge, warm playful smile, cinematic light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
