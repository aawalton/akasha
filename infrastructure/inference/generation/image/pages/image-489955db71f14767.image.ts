import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image489955db71f14767 = {
  id: "01a0c5f2-eb1d-78a2-96f4-72a0f2aa5e6c",
  type: "page-type/image",
  slug: "image-489955db71f14767",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in an elegant floor-length black evening gown, standing in a grand marble foyer, soft chandelier light, poised confident expression, 85mm portrait, shallow depth of field, fine fabric drape, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
