import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ae7453df721aca1 = {
  id: "01a0c5f3-9f6f-7f45-aa19-867cc26993e8",
  type: "page-type/image",
  slug: "image-1ae7453df721aca1",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude figure of a woman half-dissolved in soft shadow, only shoulder and hip catching a bar of light, mysterious mood, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 776450810,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
