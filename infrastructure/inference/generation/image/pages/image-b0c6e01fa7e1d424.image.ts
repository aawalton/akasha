import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB0c6e01fa7e1d424 = {
  id: "01a0c5f3-db28-76e3-bd65-bc010126028f",
  type: "page-type/image",
  slug: "image-b0c6e01fa7e1d424",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "a single red maple leaf on a white background, studio macro photo",
  seed: 396233353,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
