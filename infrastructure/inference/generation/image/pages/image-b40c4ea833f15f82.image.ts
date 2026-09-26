import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB40c4ea833f15f82 = {
  id: "019f1836-da19-7a23-8277-6851a1a7bf99",
  type: "page-type/image",
  slug: "image-b40c4ea833f15f82",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in an elegant formal black silk kimono with subtle gold patterning, kneeling on a tatami mat in a quiet traditional room, soft window light, calm composed expression, 50mm, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
