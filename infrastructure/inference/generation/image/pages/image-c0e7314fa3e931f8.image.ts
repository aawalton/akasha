import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC0e7314fa3e931f8 = {
  id: "01a0c5f2-eb1e-7312-822d-b84940d836e5",
  type: "page-type/image",
  slug: "image-c0e7314fa3e931f8",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a corduroy mini skirt, tights and cardigan browsing a cozy bookshop, warm soft light, gentle curious smile, 50mm, shallow depth of field, fine fabric texture, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
