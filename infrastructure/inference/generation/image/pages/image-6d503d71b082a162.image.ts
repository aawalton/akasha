import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6d503d71b082a162 = {
  id: "019f1836-d624-7652-b38b-c9f75542c8df",
  type: "page-type/image",
  slug: "image-6d503d71b082a162",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime magical girl, layered pastel costume with oversized bow, glowing transformation wand, sparkling magical aura, bright cheerful smile, soft studio light, 50mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
