import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5d0143b1aab4f92b = {
  id: "01a0c5f3-8d0b-7a4a-9ed2-658dc5bc14d3",
  type: "page-type/image",
  slug: "image-5d0143b1aab4f92b",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate boudoir portrait of a young woman with warm fair skin, dark wavy hair loose, soft green eyes meeting the camera with warm steady tenderness and a soft inviting almost-smile, reclining very close in warm golden light, draped in a clearly sheer translucent gauze fabric through which the soft curves of her bare body are visibly veiled, delicate translucent fabric catching the light, smooth skin in warm glow, shallow depth of field, very close intimate framing, tender sensual safe warm mood, natural soft skin texture, photographic, 50mm",
  seed: 471902,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
