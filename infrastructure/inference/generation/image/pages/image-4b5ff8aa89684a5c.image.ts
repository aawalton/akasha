import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b5ff8aa89684a5c = {
  id: "01a0c5f3-7a9b-7382-b265-ff3a60669e32",
  type: "page-type/image",
  slug: "image-4b5ff8aa89684a5c",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous woman waist-deep in a still underground pool inside a bioluminescent cavern, wearing a translucent layered silk wrap and a fine gold chain harness across her shoulders, wet dark hair swept back, glowing blue-green threads hanging from the ceiling and reflecting off the water onto her, direct calm gaze, painterly fantasy realism, cyan glow against warm skin\n",
  seed: 1572984370,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
