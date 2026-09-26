import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image609805ff0044bfc9 = {
  id: "019f1839-3214-73e8-a692-a748b873d569",
  type: "page-type/image",
  slug: "image-609805ff0044bfc9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A young woman with a newly-made unlined face and ancient still eyes that have watched ages and grieved a little, soft loose hair, lit by warm low lamplight, the faintest grave warmth at the edge of a near-smile, simple timeless neutral clothing, intimate close portrait, photorealistic, unhurried and present, wisdom worn on a youthful face",
  seed: 103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
