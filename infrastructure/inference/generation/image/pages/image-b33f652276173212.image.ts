import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB33f652276173212 = {
  id: "01a0c5f3-8d0e-7f70-abee-5c5c2b33caef",
  type: "page-type/image",
  slug: "image-b33f652276173212",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a black silk slip with a plunging neckline, thin straps falling off her shoulders, sultry gaze, dim boudoir light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1515285875,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
