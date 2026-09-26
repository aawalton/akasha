import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8f56970da4dcc982 = {
  id: "01a0c5f2-eb23-72ae-a0e8-c82b94ab6645",
  type: "page-type/image",
  slug: "image-8f56970da4dcc982",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime catgirl idol, cat ears and tail with a frilly performance outfit, neon stage, playful wink, vibrant colorful light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
