import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image20eff994722e4a32 = {
  id: "01a0c5f2-eb1f-7c51-92c6-0e6fc5130f3e",
  type: "page-type/image",
  slug: "image-20eff994722e4a32",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on an autumn date walking through fallen leaves, casual sweater and scarf, hands in pockets, cheerful smile toward the viewer, warm golden autumn light, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
