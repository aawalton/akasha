import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE7a9df8586dc0c84 = {
  id: "01a0c5f2-eb21-7218-a27a-1d2e28b203eb",
  type: "page-type/image",
  slug: "image-e7a9df8586dc0c84",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman outdoors in a yellow sundress among vineyard rows, warm late-afternoon light, content serene smile, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
