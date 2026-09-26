import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image85a9e4a64a2834f1 = {
  id: "01a00fb4-cb56-725c-9911-7e96544a0b7a",
  type: "page-type/image",
  slug: "image-85a9e4a64a2834f1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful temple dancer inside a vast sandstone hall thick with incense smoke, deep red silk draped low and pinned with heavy beaten-brass jewellery, bells at her ankles and wrists, mid-turn with one arm raised, meeting the viewer's eye, a single shaft of dusty gold light falling from a high aperture, painterly fantasy realism, warm ochre and brass\n",
  seed: 861294695,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
