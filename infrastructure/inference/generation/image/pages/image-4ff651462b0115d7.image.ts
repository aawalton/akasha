import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4ff651462b0115d7 = {
  id: "01a03b28-1000-7000-9a84-49aff1a9b262",
  type: "page-type/image",
  slug: "image-4ff651462b0115d7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt: "a single red maple leaf on white, studio macro\n",
  seed: 100672701,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx-openai-server 1.8.1", "mlx 0.31.0", "mlx-metal 0.31.0"],
} as const satisfies Image
