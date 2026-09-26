import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1e12f7c3624e403e = {
  id: "019f1836-dc11-7d10-92c0-9607f8685e0e",
  type: "page-type/image",
  slug: "image-1e12f7c3624e403e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in an elegant pastel floral formal dress as a wedding guest, sunny outdoor venue, warm light, joyful graceful smile, 50mm, shallow depth of field, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
