import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCd2c66f6291111e9 = {
  id: "01a0c5f3-b3ca-7453-a283-9257269aa5e2",
  type: "page-type/image",
  slug: "image-cd2c66f6291111e9",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "heavy-lidded woman in a slip dress with one strap fallen, head resting against a doorframe in invitation, midnight hallway lamplight, photorealistic photograph, natural skin texture, film grain",
  seed: 172774079,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
