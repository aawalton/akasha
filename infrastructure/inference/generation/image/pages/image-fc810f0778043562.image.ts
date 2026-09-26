import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFc810f0778043562 = {
  id: "019f28d3-2289-7c56-be18-22541cee6a81",
  type: "page-type/image",
  slug: "image-fc810f0778043562",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite compact young woman in her mid-twenties caught mid-laugh on a hillside, head tipped back, genuinely delighted, nose scrunched. Long black hair half-loose, strands everywhere. Blind eyes narrowed with laughter: flat matte white irises where visible, unlit, no glow. Cream linen wrap top, terracotta shawl slipping. Golden hour warmth, dry grass, dust in the light. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6502,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
