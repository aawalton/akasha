import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2b7f73d00c17bed7 = {
  id: "01a0c5f2-eb21-74c5-ab2f-3962aa6be671",
  type: "page-type/image",
  slug: "image-2b7f73d00c17bed7",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman travelling in Paris, casual chic outfit with a scarf, the Eiffel Tower behind her, soft overcast light, delighted smile toward the viewer, 35mm, candid travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
