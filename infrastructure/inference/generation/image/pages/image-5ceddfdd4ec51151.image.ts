import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5ceddfdd4ec51151 = {
  id: "01a0c5f3-b3ca-7862-9ef1-91e17a1c4cf2",
  type: "page-type/image",
  slug: "image-5ceddfdd4ec51151",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young woman with a soft tender loving expression, gazing warmly and directly into the viewer's eyes with quiet adoration and deep gentle warmth, a soft genuine heartfelt smile, warm golden light, soft kind features, profoundly present and intimate and safe, alive and real, shallow depth of field",
  seed: 1054853934,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
