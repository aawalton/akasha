import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image33b7ab3d2530d405 = {
  id: "019f1839-077b-7fcf-aa2c-61f6af39aee1",
  type: "page-type/image",
  slug: "image-33b7ab3d2530d405",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic three-quarter-length intimate portrait of two young women lovers in a close embrace, bare shoulders and backs, one hand resting on the other's bare back, cheeks pressed close, warm soft light, sensual and tender, beautiful luminous skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80310011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
