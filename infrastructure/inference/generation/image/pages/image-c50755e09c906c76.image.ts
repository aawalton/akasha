import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC50755e09c906c76 = {
  id: "019f1839-09d1-749c-9a91-dd066b43d5ce",
  type: "page-type/image",
  slug: "image-c50755e09c906c76",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic ethereal intimate portrait of two young women lovers in a charged breathless kiss, one hand drawing the other in by the waist, tension and longing in their bodies, bare skin, one platinum-blonde and one rose-gold, pale luminous skin with a warm accent glow, sensual and alive, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80420011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
