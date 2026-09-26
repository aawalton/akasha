import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d2fbcd52a990381 = {
  id: "01a0c5f2-eb21-791a-ac73-339d04e96d14",
  type: "page-type/image",
  slug: "image-2d2fbcd52a990381",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman at the Shibuya crossing in Tokyo at night, casual streetwear, neon signs and crowds behind her, vibrant city glow, excited smile, 35mm, candid travel photo, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
