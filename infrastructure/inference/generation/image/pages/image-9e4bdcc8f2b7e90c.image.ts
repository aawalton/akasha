import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9e4bdcc8f2b7e90c = {
  id: "01a0c5f3-b3c9-7866-911b-5e578e84e26e",
  type: "page-type/image",
  slug: "image-9e4bdcc8f2b7e90c",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Oklahoma personified as a beautiful young woman in her early twenties — long dark hair, western dress with red-and-gold Indian blanket flowers in hand, red-dirt plains, wheat fields and a windmill under a dramatic sky behind her, fierce warm prairie sunset, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1214933460,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
