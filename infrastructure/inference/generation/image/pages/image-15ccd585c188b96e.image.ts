import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image15ccd585c188b96e = {
  id: "01a0c5f2-eb20-7dfa-9be2-615e998c7ee1",
  type: "page-type/image",
  slug: "image-15ccd585c188b96e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman stepping across stones in a mossy forest stream, casual outdoor layers, focused playful expression, soft green dappled light, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
