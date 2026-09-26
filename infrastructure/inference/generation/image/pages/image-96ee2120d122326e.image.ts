import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image96ee2120d122326e = {
  id: "01a0c5f3-9f6f-78ac-aae3-de08d8761894",
  type: "page-type/image",
  slug: "image-96ee2120d122326e",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "boho woman in a crochet halter top and low-rise linen pants spinning barefoot, closed-eye smile, beach bonfire at dusk, photorealistic photograph, natural skin texture, film grain",
  seed: 207880368,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
