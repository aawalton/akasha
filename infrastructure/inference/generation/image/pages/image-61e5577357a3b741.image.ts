import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image61e5577357a3b741 = {
  id: "01a0c5f3-8d0f-7a6e-a9ff-ee5131db3fe1",
  type: "page-type/image",
  slug: "image-61e5577357a3b741",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Exquisitely beautiful woman shoulder-deep in a moonlit hot spring in a bamboo forest, a sheer white silk robe floating open around her in the water, wet hair swept back, delicate features and flawless glowing skin, one hand trailing across the surface, direct soft gaze, steam rising through cool blue moonlight with one warm paper lantern on the rock, painterly fantasy realism, luminous and serene\n",
  seed: 1036199437,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
