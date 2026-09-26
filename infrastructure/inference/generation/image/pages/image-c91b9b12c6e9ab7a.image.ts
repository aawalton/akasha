import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC91b9b12c6e9ab7a = {
  id: "01a0c5f3-b3cb-73f2-908f-ab15bd7e5727",
  type: "page-type/image",
  slug: "image-c91b9b12c6e9ab7a",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful Greek woman at dawn on a clifftop temple terrace, fine white linen chiton pressed against her by the sea wind and lit through by the low sun so the fabric goes translucent, gold armband, dark curls loose, hand raised to hold her hair back, meeting the viewer's eye with a knowing half-smile, marble columns and blue Aegean far below, painterly realism, warm backlight\n",
  seed: 1712992614,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
