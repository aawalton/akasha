import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4147338ec38eadbb = {
  id: "01a0c5f2-eb1e-7310-a1dd-8aefe66bced2",
  type: "page-type/image",
  slug: "image-4147338ec38eadbb",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a striking royal blue off-shoulder gown at a formal banquet, warm chandelier light, elegant composed expression, 85mm, shallow depth of field, fine fabric drape, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
