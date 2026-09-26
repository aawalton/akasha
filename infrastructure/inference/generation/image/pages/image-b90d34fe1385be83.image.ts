import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB90d34fe1385be83 = {
  id: "019f1839-006f-753e-905c-ea84b157f05e",
  type: "page-type/image",
  slug: "image-b90d34fe1385be83",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two beautiful young women in their early twenties together in a sunlit meadow at golden hour, one with long silver-blonde hair and pale blue eyes, the other with dark chestnut hair and warm brown eyes, standing close together, easy natural warmth between them, gentle relaxed smiles, warm low golden sunlight, cinematic, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80010011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
