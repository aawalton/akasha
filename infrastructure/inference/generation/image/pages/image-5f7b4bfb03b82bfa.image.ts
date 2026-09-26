import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f7b4bfb03b82bfa = {
  id: "01a0c5f3-8d0f-78c6-bca1-31cb4fe4e11e",
  type: "page-type/image",
  slug: "image-5f7b4bfb03b82bfa",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — delicately pointed fae ears, warm ivory skin, softly waved chestnut hair threaded with fine pale strands, hazel eyes — a faerie weaver of raiment, draped in sheer layers of pearl and oyster gossamer with delicate woven thread detailing at her shoulders, soft diffuse natural light, a gentle warm expression, soft shallow depth of field, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 1002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
