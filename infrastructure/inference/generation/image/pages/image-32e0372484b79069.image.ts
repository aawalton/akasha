import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image32e0372484b79069 = {
  id: "01a0c5f2-eb1e-7c6e-923e-21a2b0e2ccbb",
  type: "page-type/image",
  slug: "image-32e0372484b79069",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing outside a cafe, wearing a cute pleated mini skirt and a fitted ribbed crop top, slim figure, 85mm portrait, soft daylight, visible fabric texture, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
