import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF5f2a413f7d17b1c = {
  id: "019f1839-45f8-73a7-999e-facdc9e49b88",
  type: "page-type/image",
  slug: "image-f5f2a413f7d17b1c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a strikingly youthful woman in her early twenties with an ageless, old-soul depth in her clear silver eyes; long dark hair fading to deep red at the tips; wearing a hood and cloak of flowing deep-red SILK; a red silk thread wound around her fingers; serene, tender almost-smile, looking directly at the viewer; plain warm softly-lit background, realistic skin texture, 85mm lens, shallow depth of field, cinematic, sharp focus, no weapon",
  seed: 1006,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
