import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image90f7f812e1856610 = {
  id: "01a0c5f3-9f6c-7ed2-82f9-23e66414be4a",
  type: "page-type/image",
  slug: "image-90f7f812e1856610",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman in a daisy flower crown hugging an armful of wildflowers, meadow light, radiant smile, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2059024426,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
