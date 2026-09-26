import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD53fadd37891cdda = {
  id: "019f1839-045a-75de-a6f8-bca1f649329f",
  type: "page-type/image",
  slug: "image-d53fadd37891cdda",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two graceful young south asian women in their twenties with rich dark hair and warm brown eyes, jewel-tone wardrobe, warm golden interior light, serene elegant expressions, cinematic, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80090011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
