import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image399ddb622dd3d4d6 = {
  id: "01a0c5f3-9f6c-7bb7-b222-4a6b8e1c9e87",
  type: "page-type/image",
  slug: "image-399ddb622dd3d4d6",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a dove-grey corset unlaced at the front and loosely held, ribbons trailing, candlelit boudoir, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 902258784,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
