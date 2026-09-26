import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image30e343a3b2c86a1a = {
  id: "01a0c5f2-eb1f-7735-89bf-92f2758a831b",
  type: "page-type/image",
  slug: "image-30e343a3b2c86a1a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman holding a strong plank during a home workout, fitted activewear, slight sweat sheen, determined expression, bright natural light, wood floor and yoga mat, 50mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
