import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image73ddda610d4eb003 = {
  id: "019f1838-81f2-7d70-a731-c50a6bdd083e",
  type: "page-type/image",
  slug: "image-73ddda610d4eb003",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic elegant portrait of a beautiful young woman with dark hair in soft waves, wearing a satin slip dress, at an evening party with warm golden bokeh lights, poised graceful feminine expression, 85mm, refined natural skin detail, shallow depth of field",
  seed: 978135285,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
