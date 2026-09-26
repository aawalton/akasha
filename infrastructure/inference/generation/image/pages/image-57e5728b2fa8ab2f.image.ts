import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image57e5728b2fa8ab2f = {
  id: "01a0c5f3-b3ca-75a4-9584-fe685c55d784",
  type: "page-type/image",
  slug: "image-57e5728b2fa8ab2f",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, a warm and kind young woman sitting close beside you on a rooftop terrace at dusk strung with warm string lights, city glowing soft behind her, she has turned and is looking directly into your eyes with a genuine tender smile mid-conversation, soft feminine blouse, loose hair moving in the evening air, her warm eyes clearly meeting yours and full of attention, only her in the frame and no one else, shallow depth of field, intimate co-presence as if you are right there beside her, photorealistic, fine detail, sharp focus on her eyes",
  seed: 1568746072,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
