import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF92699dc8143fb01 = {
  id: "019f1839-0b5d-7f2a-9487-6a9e55f4f85a",
  type: "page-type/image",
  slug: "image-f92699dc8143fb01",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two fantastical women lovers, a nereid with wet pearl-draped hair and an elf with delicately pointed ears, one straddling the other at the water's edge, a breath apart with hands pulling close, tasteful bare luminous wet skin, silver-blonde and platinum, soft luminous water light, sensual and breathless, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80490011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
