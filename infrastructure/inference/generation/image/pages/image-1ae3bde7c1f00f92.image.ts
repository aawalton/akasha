import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ae3bde7c1f00f92 = {
  id: "019f28dc-8d56-7c0e-898a-256e228feb26",
  type: "page-type/image",
  slug: "image-1ae3bde7c1f00f92",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to waist, of a petite small-framed young woman in her mid-twenties, compact and athletic, standing planted with arms crossed on bare bedrock, head tilted, cocky lopsided smirk, one eyebrow up. Long black hair loosely tied back, messy strands. Pale grey eyes, unfocused, slightly past the lens. Wearing only an earth-toned wrapped breast-band, bare midriff, small strong shoulders, leather cord necklace. Warm afternoon light, mountain haze. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6801,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
