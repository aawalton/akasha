import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEed7cfec41d217ec = {
  id: "019f1836-d8f1-73fd-8476-a432dfad9944",
  type: "page-type/image",
  slug: "image-eed7cfec41d217ec",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman running on a forest trail at sunrise, athletic leggings and sports top, mid-stride, focused determined expression, dappled golden light through trees, motion energy, 35mm, action shot, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
