import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9c15b91fa28856e2 = {
  id: "01a0c5f2-eb22-7f5e-a3f1-0ded453b6961",
  type: "page-type/image",
  slug: "image-9c15b91fa28856e2",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose slouchy top, stretching gently by a bright window, soft natural light, calm content expression, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
