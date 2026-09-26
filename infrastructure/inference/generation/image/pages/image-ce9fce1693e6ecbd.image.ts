import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe9fce1693e6ecbd = {
  id: "01a0c5f3-7a9c-70e2-bf83-114aacb5eaa1",
  type: "page-type/image",
  slug: "image-ce9fce1693e6ecbd",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — delicately pointed fae ears, fresh dewy fair skin, soft golden-brown hair woven through with real blossoms and petals, clear green eyes — a faerie conjured from spring flowers, wearing a dress of layered petals and leaf-fine fabric with blossoms at her shoulders, soft dappled garden light, a tender blooming smile, soft shallow depth of field, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 1004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
