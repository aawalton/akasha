import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA7aa3b6fe3b9fd66 = {
  id: "01a0c5f2-eb25-708e-8d9a-6a9216a5640e",
  type: "page-type/image",
  slug: "image-a7aa3b6fe3b9fd66",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, stretching beside the bed, wearing a light blue cotton bra and panties, arms overhead, soft morning light, 85mm portrait, visible skin texture, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
