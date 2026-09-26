import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image27369b6812b39afe = {
  id: "019f1839-0584-7118-9dc7-faa6fa6e82bf",
  type: "page-type/image",
  slug: "image-27369b6812b39afe",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic three-quarter-length editorial portrait of two elegant young women with bare shoulders, auburn and black hair, turned into each other in direct intimate eye contact, refined cool studio light against a dark muted background, showing more than head and shoulders, beautiful luminous skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80220011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
