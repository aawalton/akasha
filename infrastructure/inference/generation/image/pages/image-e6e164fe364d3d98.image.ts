import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE6e164fe364d3d98 = {
  id: "01a0c5f3-8d0d-7ce3-bbae-338682789328",
  type: "page-type/image",
  slug: "image-e6e164fe364d3d98",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman folk singer-songwriter, wavy auburn hair, light freckles across her nose, warm hazel eyes, soft natural features, gentle expression, tight close-up portrait holding an acoustic guitar, cozy cream knit sweater, soft warm indoor window light, shallow depth of field, visible skin texture, 85mm, photoreal",
  seed: 556517742,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
