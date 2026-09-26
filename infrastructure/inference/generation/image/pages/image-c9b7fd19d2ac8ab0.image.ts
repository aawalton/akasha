import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC9b7fd19d2ac8ab0 = {
  id: "01a0c5f2-eb25-7957-a24a-1b3066e8eb93",
  type: "page-type/image",
  slug: "image-c9b7fd19d2ac8ab0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, stretching by a tall window, wearing just an oversized faded t-shirt, arms raised, warm backlight, 85mm portrait, visible skin texture, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
