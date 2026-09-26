import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2dd93c5b1d5e76bf = {
  id: "01a0c5f3-b3c9-7918-b880-76b3ada54bec",
  type: "page-type/image",
  slug: "image-2dd93c5b1d5e76bf",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Texas personified as a beautiful young woman in her early twenties — long dark waves under a straw cowboy hat, white western dress with turquoise jewelry, standing in a field of bluebonnets with hill-country oaks and a windmill behind her, big warm golden Texas evening light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1902233263,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
