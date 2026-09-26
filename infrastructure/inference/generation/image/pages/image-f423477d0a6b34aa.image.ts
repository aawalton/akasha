import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF423477d0a6b34aa = {
  id: "01a0c5f2-eb1d-7397-a190-cd510292928b",
  type: "page-type/image",
  slug: "image-f423477d0a6b34aa",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a deep burgundy velvet evening gown in an opera house balcony, soft warm box light, refined graceful expression, 85mm, shallow depth of field, rich fabric texture, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
