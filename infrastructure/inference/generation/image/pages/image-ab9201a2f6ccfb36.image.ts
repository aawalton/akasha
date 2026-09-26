import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb9201a2f6ccfb36 = {
  id: "01a0c5f3-8d0c-710d-a70a-603a9d84673f",
  type: "page-type/image",
  slug: "image-ab9201a2f6ccfb36",
  grade: "A-",
  service: "image-gen-aine",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "ainez woman, golden-hour closeup portrait, soft natural light",
  seed: 589853044,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
