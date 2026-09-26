import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image38a203cf5a38ad85 = {
  id: "019f28d7-44a3-7b81-89d1-1d0da2785d52",
  type: "page-type/image",
  slug: "image-38a203cf5a38ad85",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to hips, of a petite compact young woman in her mid-twenties standing with her weight cocked onto one hip, one hand on that hip, chin lifted in an open challenge grin — playful, fearless, daring you to try. Long black hair loosely tied, wind-loose strands. Pale grey eyes, soft-focus, not quite meeting the lens. Undyed linen wrap top, leather cord at her throat. Warm dusty light on a rocky rise. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6601,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
