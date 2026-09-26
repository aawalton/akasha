import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5b066fba0931c4db = {
  id: "01a0c5f3-b3ca-758f-8be1-7df8f456228d",
  type: "page-type/image",
  slug: "image-5b066fba0931c4db",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with light olive skin, dark wavy hair catching warm light, soft brown eyes meeting the camera with steady tender warmth, gentle almost-smile, resting very close outdoors at golden hour, sun-backlit hair glowing softly, simple soft pale-yellow top, blurred warm meadow behind, shallow depth of field, very close intimate framing, hands relaxed out of frame, alive tender safe mood, natural soft skin texture, photographic, 50mm",
  seed: 312908,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
