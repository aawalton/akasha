import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBfbdb48e05e9971a = {
  id: "01a0c5f3-9f6f-780f-90e8-18c0872169d0",
  type: "page-type/image",
  slug: "image-bfbdb48e05e9971a",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "quiet-smiling woman in fitted breeches and an open show jacket leading a horse by the bridle, misty paddock morning, photorealistic photograph, natural skin texture, film grain",
  seed: 1471602959,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
