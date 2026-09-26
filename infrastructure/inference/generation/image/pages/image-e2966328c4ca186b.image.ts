import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE2966328c4ca186b = {
  id: "01a0c5f3-7a9c-7cb4-9aa3-e2a7e49cbac2",
  type: "page-type/image",
  slug: "image-e2966328c4ca186b",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — pale luminous green-gold skin, hair a soft cascade of living leaves, spring blossoms and fine vines, delicate bark-fine patterning at her temples, large bright green eyes, a gown of woven petals, soft radiant spring light, a serene warm expression — an otherworldly being embodying spring itself, delicately pointed fae ears, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 2006,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
