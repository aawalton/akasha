import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA8554d0e715ad0f6 = {
  id: "01a0c5f3-9f6a-7c83-b596-975437065c22",
  type: "page-type/image",
  slug: "image-a8554d0e715ad0f6",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman at the edge of a Santorini infinity pool in a wet white swimsuit turned translucent, caldera behind, water streaming off her shoulders, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 2024626322,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
