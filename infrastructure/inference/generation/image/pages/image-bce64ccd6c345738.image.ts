import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBce64ccd6c345738 = {
  id: "01a0c5f2-eb24-789a-a409-330f04120947",
  type: "page-type/image",
  slug: "image-bce64ccd6c345738",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, nude, sitting up in bed having just woken up, soft white sheets and duvet draped naturally across her body, leaning back against the headboard and pillows, soft tousled bed hair, bare shoulders, point of view from beside her on the other side of the bed as if lying next to her and looking over, bright airy bedroom in soft morning light, gentle warm morning sunlight streaming through a sheer-curtained window, soft sleepy smile, relaxed, intimate, tasteful, 35mm, shallow depth of field, visible skin texture, soft natural daylight, photoreal, cinematic film still",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
