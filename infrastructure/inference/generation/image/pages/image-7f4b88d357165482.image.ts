import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7f4b88d357165482 = {
  id: "01a0c5f3-b3c9-7c86-893b-4e60305d687e",
  type: "page-type/image",
  slug: "image-7f4b88d357165482",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "young woman in a white sundress standing in an Amalfi coast lemon grove, holding a lemon, turquoise sea far below, bright Mediterranean noon, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1255201549,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
