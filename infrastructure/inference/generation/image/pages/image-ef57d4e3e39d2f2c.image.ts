import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEf57d4e3e39d2f2c = {
  id: "01a0c5f3-b3ca-70ff-90de-d0dcbf87596f",
  type: "page-type/image",
  slug: "image-ef57d4e3e39d2f2c",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, a warm and kind young woman sitting close beside you on a park bench in a golden autumn afternoon, drifting amber and red leaves, low warm sunlight, she has turned and is looking directly into your eyes laughing softly in a genuine shared moment, wrapped in a soft cream sweater and a warm scarf, loose hair catching the light, her warm eyes clearly meeting yours and full of attention, only her in the frame and no one else, shallow depth of field, intimate co-presence as if you are right there beside her, photorealistic, fine detail, sharp focus on her eyes",
  seed: 43270767,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
