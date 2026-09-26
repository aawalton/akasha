import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image29a3f5488a091893 = {
  id: "01a0c5f2-eb1e-7b03-a929-4bb28387c639",
  type: "page-type/image",
  slug: "image-29a3f5488a091893",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, on a tennis court, wearing a short pleated tennis skirt and a fitted athletic top, bright daylight, 85mm portrait, visible skin texture, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
