import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7a35f4d9111601e0 = {
  id: "01a0c5f3-9f6c-70f5-be4f-76a3e36c9004",
  type: "page-type/image",
  slug: "image-7a35f4d9111601e0",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman with two thick braids pulled forward over her chest, freckles, playful head tilt, daylight, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1396368781,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
