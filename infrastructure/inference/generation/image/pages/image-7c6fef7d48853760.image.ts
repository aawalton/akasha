import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7c6fef7d48853760 = {
  id: "01a0c5f3-b3cc-74bf-b2ee-fe2fd3c75ea1",
  type: "page-type/image",
  slug: "image-7c6fef7d48853760",
  grade: "S-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Ethereal beautiful young woman in her early twenties standing on a floating island at night among slow-turning constellations, gown of dark blue gauze scattered with points of starlight and bare shoulders, long black hair lifting, one hand outstretched with a small star resting on her palm, meeting the viewer's eye with quiet wonder, cosmic light from below and around her, painterly fantasy realism, vast and beautiful\n",
  seed: 493713103,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
