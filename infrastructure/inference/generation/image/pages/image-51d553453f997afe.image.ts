import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image51d553453f997afe = {
  id: "019f5b50-533d-7f09-a999-5873bf1e9b3b",
  type: "page-type/image",
  slug: "image-51d553453f997afe",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a flowing white dress walking the old stone walls of Dubrovnik, terracotta rooftops and the Adriatic glittering below, clear summer light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 316510430,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
