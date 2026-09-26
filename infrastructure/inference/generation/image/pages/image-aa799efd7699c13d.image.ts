import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAa799efd7699c13d = {
  id: "01a0c5f2-eb25-7ac7-b9fd-08476236ced7",
  type: "page-type/image",
  slug: "image-aa799efd7699c13d",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, leaning in a doorway, wearing a white lace bra and panties, soft diffuse light, 85mm portrait, fine lace detail, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
