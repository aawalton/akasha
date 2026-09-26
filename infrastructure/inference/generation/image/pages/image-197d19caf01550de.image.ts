import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image197d19caf01550de = {
  id: "01a0c5f3-8d0e-735a-913c-7f16177158e6",
  type: "page-type/image",
  slug: "image-197d19caf01550de",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a young woman with warm light-tan skin, long chestnut hair catching the light, soft amber eyes meeting the camera with a warm open-eyed almost-laugh, resting very close to the viewer outdoors at golden hour, sun-backlit hair glowing, simple soft white sundress, autumn field softly blurred behind, shallow depth of field, very close intimate framing, hands relaxed out of frame, alive joyful tender mood, natural soft skin texture, photographic, 50mm",
  seed: 561483,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
