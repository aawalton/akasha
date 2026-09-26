import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA441dcdc9c04f67e = {
  id: "019f1836-d952-7484-bb05-1f3db588beb1",
  type: "page-type/image",
  slug: "image-a441dcdc9c04f67e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, lying down in bed on her side facing the viewer, head resting on a soft pillow, the two of them face to face looking into each other eyes at close range, first-person point of view from the pillow beside her lying down at the same level, nude, soft white sheets and duvet draped over her body, soft tousled bed hair, bare shoulders, intimate close framing, bright airy bedroom in soft morning light, gentle warm morning sunlight streaming through a sheer-curtained window, soft sleepy smile, relaxed, intimate, tasteful, artistic nude, 50mm, shallow depth of field, visible skin texture, soft natural daylight, photoreal, cinematic film still",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
