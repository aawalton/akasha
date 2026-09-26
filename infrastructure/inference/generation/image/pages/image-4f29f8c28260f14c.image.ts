import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4f29f8c28260f14c = {
  id: "019f57d5-c3e6-77c8-a4d8-b8feef8cefbf",
  type: "page-type/image",
  slug: "image-4f29f8c28260f14c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "delighted woman in a blush tulle gown with corset bodice, caught mid-twirl laughing, grand ballroom, golden chandelier light, photorealistic photograph, natural skin texture, film grain",
  seed: 1057754407,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
