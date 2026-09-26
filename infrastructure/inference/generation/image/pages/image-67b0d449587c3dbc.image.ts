import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image67b0d449587c3dbc = {
  id: "01a0c5f3-7a9c-7b06-8470-8b3eaea95b85",
  type: "page-type/image",
  slug: "image-67b0d449587c3dbc",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Stunning young woman in her early twenties in a barely-there gown of woven gossamer and living vines that leaves her shoulders, midriff and legs bare, flowers in her tumbling auburn hair, reclining across a moss-covered stone bed in an overgrown enchanted bedchamber, one knee raised, meeting the viewer's eye with dreamy invitation, shafts of green-gold light through a broken roof, painterly fantasy realism\n",
  seed: 1749117270,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
