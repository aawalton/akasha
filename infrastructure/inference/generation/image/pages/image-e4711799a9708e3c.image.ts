import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE4711799a9708e3c = {
  id: "019f1839-0fb3-7815-8cea-84dcf6a6f423",
  type: "page-type/image",
  slug: "image-e4711799a9708e3c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "a single red maple leaf on white, studio macro",
  seed: 1728052780,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
