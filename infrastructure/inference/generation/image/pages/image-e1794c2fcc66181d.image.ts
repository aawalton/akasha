import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE1794c2fcc66181d = {
  id: "01a0c5f2-eb1d-73ea-aef6-90f0df6a56b4",
  type: "page-type/image",
  slug: "image-e1794c2fcc66181d",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a tailored power suit and silk blouse in a sleek corporate office, confident professional expression, soft daylight through floor-to-ceiling windows, 50mm, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
