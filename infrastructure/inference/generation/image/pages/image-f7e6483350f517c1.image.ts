import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF7e6483350f517c1 = {
  id: "01a0c5f3-b3ca-70a2-b6a0-62bc02d7c64e",
  type: "page-type/image",
  slug: "image-f7e6483350f517c1",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, a warm and kind young woman sitting close beside you on a bench inside a sunlit glass conservatory full of greenery and golden afternoon light, she has turned and is looking directly into your eyes with a tender genuine smile mid-conversation, wearing a soft flowing feminine sage-green dress, softly styled loose hair, delicate and graceful, her warm eyes clearly meeting yours and full of attention, only her in the frame and no one else, shallow depth of field, intimate co-presence as if you are right there beside her, photorealistic, fine detail, sharp focus on her eyes",
  seed: 63299093,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
