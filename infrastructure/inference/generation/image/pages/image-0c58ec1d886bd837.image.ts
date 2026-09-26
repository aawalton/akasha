import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0c58ec1d886bd837 = {
  id: "01a0c5f3-9f6a-7df2-bca6-38720ed5a6ac",
  type: "page-type/image",
  slug: "image-0c58ec1d886bd837",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman waist-deep in a Tuscan villa pool at golden hour, water at her hips, bare back and shoulders sunlit, cypress hills behind, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 527030053,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
