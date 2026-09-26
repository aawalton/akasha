import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE0b5fc50fc37be2f = {
  id: "01a0c5f2-eb25-78ee-afc8-e267baaf979e",
  type: "page-type/image",
  slug: "image-e0b5fc50fc37be2f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, sitting on the edge of a bed, wearing a pale pink bra and panties, leaning back on her hands, warm lamp light, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
