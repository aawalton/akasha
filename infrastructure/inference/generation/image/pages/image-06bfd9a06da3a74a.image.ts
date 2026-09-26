import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image06bfd9a06da3a74a = {
  id: "01a0c5f3-b3c8-746b-a469-643d4de9dffc",
  type: "page-type/image",
  slug: "image-06bfd9a06da3a74a",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman in her late twenties jogging along a waterfront promenade at sunrise, athletic running outfit, city skyline in the background, warm golden light, dynamic 50mm sports photograph, motion blur in the background",
  seed: 469690278,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
