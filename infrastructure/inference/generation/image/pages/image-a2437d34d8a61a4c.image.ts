import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA2437d34d8a61a4c = {
  id: "019f28de-b116-7cad-8b93-75492187a4de",
  type: "page-type/image",
  slug: "image-a2437d34d8a61a4c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to waist, of a petite small-framed young woman in her mid-twenties, compact and athletic, standing planted with arms crossed on bare bedrock, head cocked to one side, cocky lopsided smirk, one eyebrow up. Long black hair loosely tied back with a moss-green cloth hairband, messy strands escaping. Pale grey eyes, unfocused, slightly past the lens. Wearing only a wrapped breast-band of earthy moss-green linen, bare midriff, small strong shoulders, leather cord necklace. Warm afternoon light, mountain haze. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6801,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
