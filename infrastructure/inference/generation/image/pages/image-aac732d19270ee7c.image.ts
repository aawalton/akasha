import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAac732d19270ee7c = {
  id: "019f1839-058b-7f3b-a581-37e0791b2b45",
  type: "page-type/image",
  slug: "image-aac732d19270ee7c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic three-quarter-length portrait of two beautiful young women at golden hour in a meadow, one silver-blonde and one dark chestnut, embracing close with foreheads gently touching and eyes closed, a tender private moment that belongs to the two of them, warm golden light, showing head shoulders and torso, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80210011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
