import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95fce3acaa0ff4ff = {
  id: "019f1839-03f7-7d00-a92d-d49abfd70f79",
  type: "page-type/image",
  slug: "image-95fce3acaa0ff4ff",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic candid portrait of two young women, one a freckled redhead with green eyes and one a cool ash-blonde with grey eyes, soft overcast natural daylight outdoors, relaxed candid expressions, gentle and natural, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80080011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
