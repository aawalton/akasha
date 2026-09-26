import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFd15b878758eeb3e = {
  id: "01a0c5f3-8d0f-7471-833d-a9a119ee8379",
  type: "page-type/image",
  slug: "image-fd15b878758eeb3e",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman folk singer-songwriter holding an acoustic guitar, auburn hair, light freckles, soft knit sweater, sitting in a cozy sunlit coffeehouse, 85mm portrait, shallow depth of field, visible skin texture, warm window light, photoreal",
  seed: 107602291,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
