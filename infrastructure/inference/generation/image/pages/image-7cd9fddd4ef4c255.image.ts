import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7cd9fddd4ef4c255 = {
  id: "019f1839-05e8-7815-89e3-e3aee61dd952",
  type: "page-type/image",
  slug: "image-7cd9fddd4ef4c255",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-upper-body fantasy portrait of two young women in flowing ethereal fantasy gowns, embracing close with foreheads touching, an enchanted twilight landscape with soft magical light, showing their upper bodies, tender and intimate, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80270011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
