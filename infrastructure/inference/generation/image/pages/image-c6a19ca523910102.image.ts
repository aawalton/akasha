import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC6a19ca523910102 = {
  id: "01a0c5f3-8d0f-7469-877b-4636b5b74ac4",
  type: "page-type/image",
  slug: "image-c6a19ca523910102",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties doing a standing yoga stretch on a rooftop terrace at sunset, athletic yoga wear, city skyline in the background, warm golden light, dynamic 35mm lifestyle photograph",
  seed: 1220339968,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
