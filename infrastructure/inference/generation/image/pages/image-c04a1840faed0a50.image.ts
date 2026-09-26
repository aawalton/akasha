import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC04a1840faed0a50 = {
  id: "019f1839-0856-7da1-8d6f-5856d967a982",
  type: "page-type/image",
  slug: "image-c04a1840faed0a50",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic three-quarter-length intimate portrait of two young women lovers in a full embrace, more bare skin across shoulders and back, one tilting up toward the other in tender desire, warm golden backlight, romantic and sensual, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80340011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
