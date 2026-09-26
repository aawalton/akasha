import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDc12dfb9c2007064 = {
  id: "01a0c5f3-f003-7eac-9807-c5b6502f8f9e",
  type: "page-type/image",
  slug: "image-dc12dfb9c2007064",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties in a light yellow sundress sitting at an outdoor cafe table on a sunny summer day, relaxed and smiling, candid 50mm photograph, soft natural light, natural skin texture",
  seed: 1390134699,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
