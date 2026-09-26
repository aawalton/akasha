import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC2921cf4fa1c8f25 = {
  id: "01a0c5f2-eb20-72be-9646-de914b17364a",
  type: "page-type/image",
  slug: "image-c2921cf4fa1c8f25",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman standing on a coastal cliff overlooking the ocean, casual windbreaker, hair blowing in sea breeze, dramatic open sky, calm awed expression, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
