import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image61252f2e8b1750f7 = {
  id: "019f5824-7656-7c3b-8f70-ebf3a957a892",
  type: "page-type/image",
  slug: "image-61252f2e8b1750f7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "flirtatious bartender in a fitted vest with rolled sleeves shaking a cocktail mid-toss, eyebrow raised, speakeasy backbar glow, photorealistic photograph, natural skin texture, film grain",
  seed: 1247424400,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
