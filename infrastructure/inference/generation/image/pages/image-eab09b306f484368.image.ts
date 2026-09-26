import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEab09b306f484368 = {
  id: "01a0c5f2-eb21-769d-bdcd-4b0b2ea0089f",
  type: "page-type/image",
  slug: "image-eab09b306f484368",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in Prague's old town square, casual autumn outfit, gothic spires and colorful buildings behind, soft warm light, delighted smile, 35mm, candid travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
