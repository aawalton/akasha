import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image034870e4bf0e7310 = {
  id: "01a0c5f3-8d0f-79c5-a5d5-f13912533b05",
  type: "page-type/image",
  slug: "image-034870e4bf0e7310",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Very attractive redheaded woman with freckles curled in an armchair by a fireplace, oversized cream knit sweater slipping off one shoulder, bare legs tucked under, holding a mug, firelight on her face, soft intimate lighting, cosy winter portrait\n",
  seed: 176651137,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
