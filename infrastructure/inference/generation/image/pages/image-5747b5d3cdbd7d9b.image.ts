import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5747b5d3cdbd7d9b = {
  id: "01a0c5f3-8d10-75ae-b2e9-c9309893deea",
  type: "page-type/image",
  slug: "image-5747b5d3cdbd7d9b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — fair skin with a faint luminous green-gold cast, fine dark-brown eyebrows, wild wavy leaf-green hair threaded with small leaves, vivid green eyes bright with a playful knowing spark, a delicate tiara of finely-woven green leaves and fine gold vinework resting on her brow, a fitted gown of dark-green overlapping leaves, soft dappled dusk-forest light, a sharp clever mischievous half-smile, a princess of the fae, delicately pointed fae ears, sharp realistic detail, visible skin pores, natural film-like color, soft shallow depth of field",
  seed: 2005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
