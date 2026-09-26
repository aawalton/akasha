import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image24e1642a6d1b6ba8 = {
  id: "01a0c5f2-eb1f-7ff3-a7d5-fded6765d076",
  type: "page-type/image",
  slug: "image-24e1642a6d1b6ba8",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a beach date at sunset, casual flowy top and rolled jeans, barefoot in the sand, looking back with a soft smile, golden-hour light, ocean behind, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
