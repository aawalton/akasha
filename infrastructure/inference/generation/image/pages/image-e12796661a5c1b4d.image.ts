import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE12796661a5c1b4d = {
  id: "019f1839-058c-7e02-833e-6b6798a68d41",
  type: "page-type/image",
  slug: "image-e12796661a5c1b4d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy portrait of two beautiful young elven women with delicately pointed ears, one fair and one dark, foreheads gently touching in a tender private moment, soft enchanted forest light with faint glowing motes, ethereal and otherworldly, beautiful luminous skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80240011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
