import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image352765f255131ce0 = {
  id: "019f1839-452f-7d19-8cbe-7dbb373cb0ec",
  type: "page-type/image",
  slug: "image-352765f255131ce0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a strikingly youthful woman in her early twenties; clear silver eyes carrying a faint ancient sadness beneath a warm, tender expression; long dark hair fading to deep red at the tips; a hood of flowing deep-red SILK framing her face; red silk thread between her fingers; soft directional light, realistic skin texture, 85mm lens, shallow depth of field, cinematic, sharp focus, no weapon",
  seed: 1005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
