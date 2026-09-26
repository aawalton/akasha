import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCf7525b6b82e1ca5 = {
  id: "01a0c5f3-9f6f-7502-a7c1-7df0aba586a1",
  type: "page-type/image",
  slug: "image-cf7525b6b82e1ca5",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a red flamenco-inspired dress with a flower in her hair in a whitewashed Seville courtyard, orange trees and afternoon shade, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1572767604,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
