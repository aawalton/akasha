import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ae57cd789451152 = {
  id: "01a0c5f3-b3ca-7969-acf2-d8c1250d4801",
  type: "page-type/image",
  slug: "image-9ae57cd789451152",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph from a low intimate angle, a warm and kind young woman sitting close on the couch in soft evening lamplight, she has just turned to look up and meet your eyes mid-conversation, a genuine unguarded smile, soft feminine cream knit, loose flowing hair, warm eyes meeting yours, cozy lived-in room, only her in the frame and no one else, shallow depth of field, intimate co-presence as if you are right there beside her, photorealistic, fine detail",
  seed: 1662719681,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
