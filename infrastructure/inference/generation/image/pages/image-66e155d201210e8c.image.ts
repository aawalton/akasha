import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image66e155d201210e8c = {
  id: "01a0c5f2-eb25-734a-a95d-c6ce0447c0a2",
  type: "page-type/image",
  slug: "image-66e155d201210e8c",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, curled up on a couch with a blanket, wearing just an oversized cream t-shirt, cozy evening lamp light, 85mm portrait, shallow depth of field, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
