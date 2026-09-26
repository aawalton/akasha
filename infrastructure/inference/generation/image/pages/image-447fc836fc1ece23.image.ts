import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image447fc836fc1ece23 = {
  id: "01a0c5f3-b3c9-7065-b659-2975c19685a7",
  type: "page-type/image",
  slug: "image-447fc836fc1ece23",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman at a Provence farmhouse window in morning light wearing only a white sheet held loosely around her hips, bare above, lavender fields beyond, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1296347220,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
