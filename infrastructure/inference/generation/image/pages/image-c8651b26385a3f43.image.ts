import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC8651b26385a3f43 = {
  id: "01a0c5f2-eb1d-79b8-a19d-b1bff6a8ae66",
  type: "page-type/image",
  slug: "image-c8651b26385a3f43",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a minimalist champagne satin slip gown at an art gallery opening, soft museum lighting, understated elegant expression, 85mm, shallow depth of field, fine fabric sheen, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
