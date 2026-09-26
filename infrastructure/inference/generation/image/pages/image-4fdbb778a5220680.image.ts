import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4fdbb778a5220680 = {
  id: "01a0c5f2-eb25-7cbd-970c-b6c1043632b9",
  type: "page-type/image",
  slug: "image-4fdbb778a5220680",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, leaning over a bathroom sink, splashed wet transparent white t-shirt, wet skin, soft window light, 85mm portrait, shallow depth of field, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
