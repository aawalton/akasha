import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1de04affacd44f5e = {
  id: "019f1836-d747-7913-ac43-736e266fefe9",
  type: "page-type/image",
  slug: "image-1de04affacd44f5e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a magical girl, frilly pastel costume with bows and ribbons, glowing wand, sparkles in the air, bright cheerful expression, soft studio light, 50mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
