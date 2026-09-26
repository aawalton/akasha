import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f1143add8f757d1 = {
  id: "01a0c5f3-8d0d-75e4-960e-84709b83fe4e",
  type: "page-type/image",
  slug: "image-5f1143add8f757d1",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a lovely adult flower fae woman, early twenties, soft feminine figure, delicate pink-and-white petal wings, long pastel-pink hair with blossoms, blue eyes, sweet warm smile, dress of layered flower petals, standing on a giant blooming flower in a spring garden, soft warm light and drifting petals, 35mm full length, photorealistic",
  seed: 844,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
