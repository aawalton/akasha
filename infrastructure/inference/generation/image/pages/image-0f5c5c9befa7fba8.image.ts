import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f5c5c9befa7fba8 = {
  id: "01a0c5f2-eb22-7f0b-a35e-e98a3722cf82",
  type: "page-type/image",
  slug: "image-0f5c5c9befa7fba8",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime mecha pilot in a skintight plugsuit with glowing seams and interface clips, futuristic cockpit, focused expression, cool neon light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
