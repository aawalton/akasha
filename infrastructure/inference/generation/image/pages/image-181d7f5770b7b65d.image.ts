import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image181d7f5770b7b65d = {
  id: "019f1839-0f56-7f9f-8c7b-7802ed22fba7",
  type: "page-type/image",
  slug: "image-181d7f5770b7b65d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "a red maple leaf on white, studio macro",
  seed: 23506371,
  width: 512,
  height: 512,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
