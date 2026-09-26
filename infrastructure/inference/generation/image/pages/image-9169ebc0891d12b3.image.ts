import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9169ebc0891d12b3 = {
  id: "01a0c5f2-eb20-7b67-a6b4-b11a6278619b",
  type: "page-type/image",
  slug: "image-9169ebc0891d12b3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a date at a scenic overlook at sunset, casual cardigan and jeans, leaning on a railing, soft happy smile toward the viewer, warm golden light, valley behind, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
