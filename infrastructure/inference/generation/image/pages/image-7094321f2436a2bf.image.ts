import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7094321f2436a2bf = {
  id: "01a0c5f3-b3cb-781a-ac76-8ae402ef6cf4",
  type: "page-type/image",
  slug: "image-7094321f2436a2bf",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a beautiful adult fae woman like a grown Tinkerbell, early twenties, slender curvy figure, large iridescent fairy wings, blonde hair in a messy bun, bright green eyes, playful confident smirk, short green leaf dress, hovering in a sunlit forest glade with glowing pollen, graceful pose, warm magical light, 35mm full length, photorealistic",
  seed: 841,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
