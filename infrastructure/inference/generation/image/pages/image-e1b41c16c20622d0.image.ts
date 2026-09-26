import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE1b41c16c20622d0 = {
  id: "01a0c5f3-8d0e-73a5-bc99-a2703320388c",
  type: "page-type/image",
  slug: "image-e1b41c16c20622d0",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman seated on the marble steps of a French château staircase, legs crossed at the knee, bare breasts, chandelier light, aristocratic poise, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 981050033,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
