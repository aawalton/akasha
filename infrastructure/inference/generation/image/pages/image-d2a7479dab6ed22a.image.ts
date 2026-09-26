import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD2a7479dab6ed22a = {
  id: "019f1839-0aa3-7284-8276-b23f3d5547d5",
  type: "page-type/image",
  slug: "image-d2a7479dab6ed22a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two fantastical women lovers, an elf with delicately pointed ears and a dryad crowned with leaves, one straddling the other's lap in a charged alive kiss, a hand at the waist drawing her in, tasteful bare luminous skin, silver and deep auburn hair, enchanted forest light with drifting glowing motes, sensual and otherworldly, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80450011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
