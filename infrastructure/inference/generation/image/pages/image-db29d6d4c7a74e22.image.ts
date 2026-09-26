import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDb29d6d4c7a74e22 = {
  id: "01a0c5f2-eb21-7991-abc0-7c7371f3b3c2",
  type: "page-type/image",
  slug: "image-db29d6d4c7a74e22",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman walking through a path of vermilion torii gates in Kyoto, casual outfit, soft filtered light, peaceful curious expression, 35mm, candid travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
