import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA0d2025a495891e5 = {
  id: "019f1839-05df-7d4a-835a-e933ed8a4348",
  type: "page-type/image",
  slug: "image-a0d2025a495891e5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic three-quarter-length ethereal portrait of two young women with pale luminous skin, platinum and rose-gold hair, one holding the other close with cheeks nearly touching, breathless serene intimacy, soft pastel light, showing head shoulders and body, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80230011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
