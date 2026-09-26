import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image57d2de5a5cbbc851 = {
  id: "019f1839-0b6b-7a8f-a5d1-b33d10c78208",
  type: "page-type/image",
  slug: "image-57d2de5a5cbbc851",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two dryad lovers lying together in a soft mossy grove, leaves in their hair and delicate bark accents on tasteful bare luminous skin, foreheads close and a hand drawing the other in, honey-blonde and chestnut, warm dappled afternoon forest light, tender breathless and sensual, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80480011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
