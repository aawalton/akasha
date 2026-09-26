import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image58a04f65c373f2b8 = {
  id: "01a0c5f3-b3ca-794f-b819-d17e5b11aa62",
  type: "page-type/image",
  slug: "image-58a04f65c373f2b8",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, a warm and kind young woman standing close beside you on a quiet hillside at night beneath a vast sky of green and violet aurora and countless stars, soft natural starlight on her face, she has turned away from the sky to look directly into your eyes with a tender awe-struck smile sharing the wonder of the moment with you, wrapped in a warm wool coat, loose hair, her warm eyes clearly meeting yours and full of attention, only her in the frame and no one else, shallow depth of field on her, intimate co-presence as if you are right there beside her, photorealistic, fine detail, sharp focus on her eyes, cinematic",
  seed: 1919008657,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
