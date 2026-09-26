import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE032053982f93281 = {
  id: "01a0c5f3-9f6f-703b-9b76-fde9f3a13b7d",
  type: "page-type/image",
  slug: "image-e032053982f93281",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman sitting on the stone quay of the Seine at sunset, sundress and bare feet, Eiffel Tower glowing in the warm distance, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1469460921,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
