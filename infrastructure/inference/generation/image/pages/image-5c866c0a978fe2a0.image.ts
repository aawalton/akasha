import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5c866c0a978fe2a0 = {
  id: "01a0c5f2-eb23-7e00-8d42-2fb21756a62c",
  type: "page-type/image",
  slug: "image-5c866c0a978fe2a0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a sci-fi space soldier, sleek armored bodysuit with glowing accents, helmet under her arm, dramatic neon-lit corridor, determined expression, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
