import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image38b9880c7a469f88 = {
  id: "019f1838-73dd-768f-8bab-afd51a173a91",
  type: "page-type/image",
  slug: "image-38b9880c7a469f88",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman looking directly and warmly at the viewer with a face full of genuine wonder and tender delight, as if she is seeing something wonderful in you, eyes bright and softly lit with awe, a tender amazed smile, warm golden light, soft gentle kind features, deeply present and personal and safe, intimate and alive, shallow depth of field",
  seed: 1341893504,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
