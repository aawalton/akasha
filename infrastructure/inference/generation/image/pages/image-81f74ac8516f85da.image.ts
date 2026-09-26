import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image81f74ac8516f85da = {
  id: "01a0c5f3-7a9c-72e6-a0b9-379bad77c111",
  type: "page-type/image",
  slug: "image-81f74ac8516f85da",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — dewy fair skin with a healthy spring warmth, soft golden-brown hair woven with fresh blossoms and small green leaves, a dress of layered petals and leaf-fine fabric, soft dappled spring-garden light, a sweet gentle smile, clear bright green eyes, delicately pointed fae ears, a warm tender expression, soft shallow depth of field, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 2001,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
