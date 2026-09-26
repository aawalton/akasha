import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7652de2354c21932 = {
  id: "01a0c5f3-9f6a-7232-bb0b-8578ed3b1b80",
  type: "page-type/image",
  slug: "image-7652de2354c21932",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman leaning on a Riviera hotel balcony rail at night in an open silk robe, nothing beneath, Monte Carlo lights glittering below, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 951474297,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
