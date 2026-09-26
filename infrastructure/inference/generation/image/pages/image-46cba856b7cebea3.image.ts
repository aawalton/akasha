import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image46cba856b7cebea3 = {
  id: "019f28df-8846-72b9-aca3-b0a9c7285a19",
  type: "page-type/image",
  slug: "image-46cba856b7cebea3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to waist, of a petite small-framed young woman in her mid-twenties, compact athletic build, arms crossed, head cocked with a cocky lopsided smirk — supremely confident, teasing, like she heard you coming a mile away. One eyebrow slightly raised. Long black hair loosely tied back with a sage-green woven hairband, messy strands over her brow. Pale grey eyes, soft and unfocused, gazing slightly past the camera. Sage-green wrapped linen breast-band, bare midriff, leather cord at her throat. Warm afternoon light, mountain haze behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6501,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
