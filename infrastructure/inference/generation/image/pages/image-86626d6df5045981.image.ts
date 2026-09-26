import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image86626d6df5045981 = {
  id: "01a0c5f3-7a9c-7c40-a926-595f3852d303",
  type: "page-type/image",
  slug: "image-86626d6df5045981",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — warm ivory skin with a faint iridescent shimmer, delicate translucent dragonfly-like fae wings rising behind her shoulders, large luminous faceted green eyes, flower-crowned soft hair, a petal-and-gossamer dress, soft golden spring light, a curious tender smile, delicately pointed fae ears, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 2003,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
