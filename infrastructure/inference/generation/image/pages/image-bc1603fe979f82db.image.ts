import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBc1603fe979f82db = {
  id: "01a0c5f3-9f6b-7f69-90c1-6204efbe93ad",
  type: "page-type/image",
  slug: "image-bc1603fe979f82db",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with fair skin, dark hair, soft grey-green eyes meeting the camera with quiet steady tenderness, gentle unguarded almost-smile, resting very close by a rain-streaked window in soft cool daylight with warm interior glow, simple soft charcoal sweater, shallow depth of field, very close intimate framing, hands relaxed out of frame, calm safe tender mood, natural soft skin texture, photographic, 50mm",
  seed: 651092,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
