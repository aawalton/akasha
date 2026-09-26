import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image18315f6a585908de = {
  id: "01a0c5f2-eb24-71a7-83e8-1bf62d643b1e",
  type: "page-type/image",
  slug: "image-18315f6a585908de",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, sitting up in bed having just woken up, leaning back against the headboard and pillows, soft tousled bed hair, wearing a light delicate one-piece nightgown with thin shoulder straps and bare shoulders, point of view from beside her on the other side of the bed as if lying next to her and looking over, rumpled sheets and duvet across the bed, cozy dim bedroom, warm bedside lamp glow, sheer-curtained window softly out of focus, soft sleepy smile, relaxed, 35mm, shallow depth of field, visible skin texture, soft golden warm lighting, photoreal, cinematic film still",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
