import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1fc2d56f71d8be7b = {
  id: "019f1839-0070-716e-bb5b-e495d6314b1e",
  type: "page-type/image",
  slug: "image-1fc2d56f71d8be7b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic editorial portrait of two elegant young women in their twenties, one with deep auburn-red wavy hair and green eyes, the other with sleek raven-black hair and cool grey eyes, refined and composed, soft cool studio light against a dark muted background, calm confident expressions, high-fashion mood, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80020011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
