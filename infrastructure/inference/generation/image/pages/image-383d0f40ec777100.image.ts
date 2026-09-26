import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image383d0f40ec777100 = {
  id: "01a0c5f2-eb1d-7650-96c0-9b75840b3dc6",
  type: "page-type/image",
  slug: "image-383d0f40ec777100",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a shimmering silver sequin gown at a gala, sparkling under event lighting, graceful poised posture, 85mm, shallow depth of field, fine sequin detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
