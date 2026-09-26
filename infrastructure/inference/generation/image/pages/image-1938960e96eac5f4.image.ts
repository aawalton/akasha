import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1938960e96eac5f4 = {
  id: "01a0c5f3-9f6b-724b-a787-904e0a7370ef",
  type: "page-type/image",
  slug: "image-1938960e96eac5f4",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with warm fair skin, dark hair tucked behind one ear, bright brown eyes meeting the camera with a warm playful teasing sparkle and a kind mischievous half-smile, as if mid-banter sharing a private joke with the viewer, resting close in a bright sunlit room with soft warm tones, simple soft olive-green top, shallow depth of field, very close intimate framing, hands relaxed out of frame, playful warm safe fun mood, natural soft skin texture, photographic, 50mm",
  seed: 840365,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
