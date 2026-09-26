import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8dd5fa7e109683db = {
  id: "01a0c5f3-9f6f-7b67-b31a-d12536069b9b",
  type: "page-type/image",
  slug: "image-8dd5fa7e109683db",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman laughing at a blue-painted island taverna table with grilled fish and white wine, bougainvillea overhead, Greek island afternoon, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 328612731,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
