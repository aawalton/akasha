import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDd920052ce902e04 = {
  id: "01a0c5f3-9f6d-722b-8c0f-6116608319a8",
  type: "page-type/image",
  slug: "image-dd920052ce902e04",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of a young maple dryad in autumn, warm tan skin, hair of fiery red and orange maple leaves, deep golden eyes, mischievous half-smile, freckles, surrounded by falling autumn leaves in a golden forest, warm low sunlight, rich color, 85mm, shallow depth of field, photorealistic",
  seed: 803,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
