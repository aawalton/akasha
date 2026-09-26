import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image30f73e5868976511 = {
  id: "01a0c5f3-9f6b-79f0-af40-d4a8c3064829",
  type: "page-type/image",
  slug: "image-30f73e5868976511",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with soft fair skin, dark hair loose, gentle grey-blue eyes meeting the camera with a quiet tender wistful warmth, soft vulnerable almost-smile, resting very close in soft diffused window light at dusk, simple soft heather-grey top, shallow depth of field, very close intimate framing, hands relaxed out of frame, gentle open-hearted safe mood, natural soft skin texture, photographic, 50mm",
  seed: 593028,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
