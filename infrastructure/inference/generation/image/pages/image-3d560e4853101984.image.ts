import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d560e4853101984 = {
  id: "01a0c5f3-b3ca-7893-889b-b7354f9b85ee",
  type: "page-type/image",
  slug: "image-3d560e4853101984",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic candid portrait of a distinctive striking young woman outdoors on a bright breezy beach boardwalk, soft genuine warm laugh with eyes open and meeting yours, wind in her loose hair, sun-kissed natural skin, casual summer clothes, lively bright and alive, shallow depth of field with soft bokeh, warm natural daylight, a fresh spontaneous joyful moment, close framing",
  seed: 288157,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
