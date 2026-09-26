import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB8c4a1e8f4a52727 = {
  id: "019f1839-452c-750f-a8e7-fb1fcadc53ba",
  type: "page-type/image",
  slug: "image-b8c4a1e8f4a52727",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic chest-up portrait of a strikingly youthful woman in her early twenties with an ageless, old-soul quality in her clear silver eyes; long dark hair fading to deep red at the tips; wearing a hood and cloak of flowing deep-red SILK that catches the light; a fine red silk thread wound around her fingers; gentle knowing half-smile, looking directly at the viewer; warm soft light, realistic skin texture, 85mm lens, shallow depth of field, cinematic warm lighting, sharp focus, no weapon",
  seed: 1004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
