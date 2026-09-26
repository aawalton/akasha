import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f2e88fef7d6379a = {
  id: "01a0c5f2-eb1f-7111-8742-4378aead935a",
  type: "page-type/image",
  slug: "image-5f2e88fef7d6379a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a bakery cafe date, casual knit top, choosing a pastry at the counter with a delighted smile toward the viewer, warm cozy light, 50mm, shallow depth of field, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
