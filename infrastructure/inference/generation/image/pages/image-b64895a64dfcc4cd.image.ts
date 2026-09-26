import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB64895a64dfcc4cd = {
  id: "019f1839-0779-7005-9671-c7587badeeec",
  type: "page-type/image",
  slug: "image-b64895a64dfcc4cd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic three-quarter-length intimate portrait of two elegant young women lovers embracing in a tender kiss, one auburn and one raven-haired, bare shoulders, refined warm light, sophisticated and sensual, beautiful luminous skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80330011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
