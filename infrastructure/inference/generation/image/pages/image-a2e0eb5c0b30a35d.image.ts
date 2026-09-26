import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA2e0eb5c0b30a35d = {
  id: "01a0c5f3-8d0f-7440-8762-b8c7778c8a9d",
  type: "page-type/image",
  slug: "image-a2e0eb5c0b30a35d",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Stunning young woman in her early twenties in a palace carved from blue ice, sheer crystal-beaded gown that catches every glimmer, frost-white hair braided with silver, standing barefoot on polished ice with one hand against a frozen column, looking directly at the viewer with cool composure, refracted blue and white light shafting through the ice, painterly fantasy realism, glacial and dazzling\n",
  seed: 1483916549,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
