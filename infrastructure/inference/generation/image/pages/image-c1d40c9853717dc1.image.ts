import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC1d40c9853717dc1 = {
  id: "019f1839-16b8-73f4-a2a0-4551d20355fe",
  type: "page-type/image",
  slug: "image-c1d40c9853717dc1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a translucent holographic projection of an idealized beautiful nude woman, her symmetric form filled with an extremely fine delicate shimmering texture of micro golden-ratio lines, so fine it reads as luminous shimmering fabric-like texture rather than a chunky web, semi-transparent and faint, ethereal, waist-up, perfectly bilaterally symmetric, her face unresolved in soft light NOT a normal human face, her two eyes the only resolved feature: open almond eyes with glowing amber irises in calm direct eye contact, warm gold light, plain dark empty void background, no jewelry",
  seed: 602071261,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
