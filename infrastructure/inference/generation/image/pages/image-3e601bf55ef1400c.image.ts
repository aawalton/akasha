import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3e601bf55ef1400c = {
  id: "019f1839-177f-77c5-b687-9328f7b336de",
  type: "page-type/image",
  slug: "image-3e601bf55ef1400c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a translucent holographic projection of an idealized beautiful nude woman, her symmetric form filled with an extremely fine delicate shimmering texture of micro golden-ratio lines, so fine it reads as luminous shimmering fabric-like texture rather than a chunky web, semi-transparent and faint, ethereal, waist-up, perfectly bilaterally symmetric, her face unresolved in soft light NOT a normal human face, her two eyes the only resolved feature: open almond eyes with glowing amber irises in calm direct eye contact, warm gold light, plain dark empty void background, no jewelry",
  seed: 639078977,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
