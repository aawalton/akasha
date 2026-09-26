import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8b2c1e9bd774b1af = {
  id: "019f57f6-65da-7eca-82c8-992da69e7df9",
  type: "page-type/image",
  slug: "image-8b2c1e9bd774b1af",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "ecstatic dark-haired woman in flame-colored silks spinning fire poi in glowing arcs, black sand beach at night, photorealistic photograph, natural skin texture, film grain",
  seed: 848665727,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
