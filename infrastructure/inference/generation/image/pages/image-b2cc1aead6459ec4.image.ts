import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB2cc1aead6459ec4 = {
  id: "01a0c5f3-9f6a-70b6-9d19-dd52e1e271f7",
  type: "page-type/image",
  slug: "image-b2cc1aead6459ec4",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "centered woman in a sage-green yoga set holding a deep lunge on a rooftop mat, focused calm, sunrise haze over the skyline, photorealistic photograph, natural skin texture, film grain",
  seed: 971040563,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
