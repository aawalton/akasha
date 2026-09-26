import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4eefb2443e65d721 = {
  id: "01a0c5f2-eb22-72e4-9ac0-27c9f0733124",
  type: "page-type/image",
  slug: "image-4eefb2443e65d721",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose flowy top, leaning casually in a doorway with arms crossed, warm soft light, relaxed confident smile toward the viewer, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
