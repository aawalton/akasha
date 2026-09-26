import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5bb95cbda02896b4 = {
  id: "01a0c5f3-8d0b-771a-8507-580ff4e28638",
  type: "page-type/image",
  slug: "image-5bb95cbda02896b4",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with warm fair skin and soft freckles, chestnut hair loose in the breeze, bright warm brown eyes meeting the camera with a genuine alive open-eyed almost-smile, resting close outdoors on a crisp golden autumn day, soft daylight, cozy chunky cream knit sweater and soft scarf, blurred autumn foliage behind, shallow depth of field, very close intimate framing, hands relaxed out of frame, alive warm joyful safe mood, natural soft skin texture, photographic, 50mm",
  seed: 116739,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
