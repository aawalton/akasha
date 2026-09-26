import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image71f390809a8253bb = {
  id: "01a0c5f3-7a9c-730c-961d-4d635de9b7bb",
  type: "page-type/image",
  slug: "image-71f390809a8253bb",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful young woman in her early twenties in a glasshouse at night, silk robe untied and hanging open over delicate cream lingerie, strawberry blonde hair loose, standing barefoot among heavy tropical leaves and orchids, one hand trailing a frond, looking at the viewer with soft invitation, warm amber grow-lights against black glass, painterly realism, humid and glowing\n",
  seed: 600508294,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
