import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image12737f154f29c313 = {
  id: "01a0c5f3-b3c9-7317-b424-e80e60ff124f",
  type: "page-type/image",
  slug: "image-12737f154f29c313",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a simple dress lying in a Swiss alpine wildflower meadow, snow-capped peaks behind, high clean summer light, arms behind her head, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1387823984,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
