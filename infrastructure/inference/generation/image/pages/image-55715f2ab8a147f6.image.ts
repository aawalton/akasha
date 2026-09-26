import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image55715f2ab8a147f6 = {
  id: "019f1839-00d4-7bc1-9a90-4f60f6a35216",
  type: "page-type/image",
  slug: "image-55715f2ab8a147f6",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two beautiful young women at golden hour in a sunlit meadow, one with long silver-blonde hair and the other with dark chestnut hair, cheeks almost touching, eyes meeting with genuine warmth and a shared quiet smile, striking fair-and-dark contrast, warm low golden light, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80130011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
