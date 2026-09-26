import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image33b9130172f18f7f = {
  id: "01a0c5f2-eb24-74b4-b1a6-65f607b2cb00",
  type: "page-type/image",
  slug: "image-33b9130172f18f7f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman laughing across a breakfast table, mid-genuine-laugh, sunlit kitchen, plate and coffee in front of her, warm candid moment, 35mm, soft morning light, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
