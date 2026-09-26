import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image68ab2cf02c615dd5 = {
  id: "019f1839-03ff-7d13-aa8a-36794529856c",
  type: "page-type/image",
  slug: "image-68ab2cf02c615dd5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two lively young latina women in their twenties with warm brown skin and dark hair, on an urban rooftop at golden hour, vibrant happy expressions, city glow behind them, warm cinematic light, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80110011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
