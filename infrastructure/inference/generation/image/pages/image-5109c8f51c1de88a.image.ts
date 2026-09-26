import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5109c8f51c1de88a = {
  id: "01a0c5f2-eb21-774b-b1cc-1c7195fcc0da",
  type: "page-type/image",
  slug: "image-5109c8f51c1de88a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a Venice canal bridge, casual summer outfit, gondolas and colorful buildings behind, warm golden light, joyful relaxed smile, 35mm, candid travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
