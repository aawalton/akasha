import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb53a64f00e2bbea = {
  id: "01a0c5f2-eb23-7f68-8a29-9f85e103ea30",
  type: "page-type/image",
  slug: "image-ab53a64f00e2bbea",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime angel, white feathered wings and a flowing celestial dress with a halo, glowing heavenly clouds, serene gentle smile, soft radiant light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
