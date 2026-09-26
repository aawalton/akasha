import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4482b2140962f70d = {
  id: "019f1839-0787-7667-98af-f0dcfef2639f",
  type: "page-type/image",
  slug: "image-4482b2140962f70d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of two young women lovers a breath apart about to kiss, noses nearly touching and eyes closed, one silver-blonde and one dark chestnut, bare shoulders, warm golden light, tender romantic tension, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80300011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
