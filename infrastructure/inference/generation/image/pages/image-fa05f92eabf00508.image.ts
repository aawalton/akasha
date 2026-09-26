import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFa05f92eabf00508 = {
  id: "01a0c5f2-eb24-70d9-8f18-0ff7906ed665",
  type: "page-type/image",
  slug: "image-fa05f92eabf00508",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, nude, sitting up in bed having just woken up, soft white sheets draped naturally across her body, leaning back against the headboard and pillows, soft tousled bed hair, bare shoulders, close-up intimate framing, looking directly into the camera with warm direct eye contact, point of view close beside her on the bed, bright airy bedroom in soft morning light, gentle warm morning sunlight streaming through a sheer-curtained window, soft sleepy smile, relaxed, intimate, tasteful, 50mm, shallow depth of field, visible skin texture, soft natural daylight, photoreal, cinematic film still",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
