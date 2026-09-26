import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c9953f69961b4f5 = {
  id: "01a0c5f3-b3c7-71d9-a214-e6123334e3df",
  type: "page-type/image",
  slug: "image-6c9953f69961b4f5",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "wired-grinning woman in a holographic bomber over a neon bra and cargo pants crouched on a fire escape, glowing tattoos, rain-slick neon megacity, photorealistic photograph, natural skin texture, film grain",
  seed: 158002499,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
