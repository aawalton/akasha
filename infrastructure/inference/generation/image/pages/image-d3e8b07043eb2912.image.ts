import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD3e8b07043eb2912 = {
  id: "01a0c5f3-8d0d-7222-b2c5-7ccad9808d26",
  type: "page-type/image",
  slug: "image-d3e8b07043eb2912",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of a young birch dryad, pale skin with black-and-white birch-bark markings, silvery-white hair with a few small bare twigs, frost-blue eyes, quiet serene expression, in a snowy birch forest with soft winter light, cool palette with warm skin, delicate beauty, 85mm, shallow depth of field, photorealistic",
  seed: 805,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
