import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA96032fa41f6c220 = {
  id: "01a0c5f3-b3c8-7331-8431-b790ab6bd968",
  type: "page-type/image",
  slug: "image-a96032fa41f6c220",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a young dryad whose body is overgrown with blooming flowers and moss, petals and leaves growing directly from her skin, bark veining along her ribs and legs, hair of blossoms, vivid green eyes, gentle wondering expression, lush spring meadow and forest edge, warm light, intricate botanical detail, 35mm full length, photorealistic",
  seed: 815,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
