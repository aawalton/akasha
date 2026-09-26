import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBb574ac40e252501 = {
  id: "019f1839-0908-7663-86a4-3e81b474006b",
  type: "page-type/image",
  slug: "image-bb574ac40e252501",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy three-quarter-length portrait of two ethereal elven women lovers with delicately pointed ears, a breath apart gazing at each other's lips about to kiss, bare luminous skin and tasteful nude shoulders, one silver-haired and one deep auburn, soft enchanted forest light with faint glowing motes, breathless otherworldly desire, sensual and dreamlike, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80370011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
