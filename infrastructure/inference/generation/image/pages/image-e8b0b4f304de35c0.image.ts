import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8b0b4f304de35c0 = {
  id: "01a0c5f2-eb24-75dd-b85b-f0ad276f4b5d",
  type: "page-type/image",
  slug: "image-e8b0b4f304de35c0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, sitting up in bed having just woken up, leaning back against the headboard and pillows, soft tousled bed hair, wearing delicate silky lingerie, point of view from beside her on the other side of the bed as if lying next to her and looking over, rumpled white sheets and duvet across the bed, bright airy bedroom in soft morning light, gentle warm morning sunlight streaming through a sheer-curtained window, soft sleepy smile, relaxed, 35mm, shallow depth of field, visible skin texture, soft natural daylight, photoreal, cinematic film still",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
