import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image300eba8788c17424 = {
  id: "01a0c5f3-9f6c-7da9-9b31-eb218377d9ba",
  type: "page-type/image",
  slug: "image-300eba8788c17424",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "beautiful feminine woman with long auburn hair wearing only a tartan kilt low on her hips, arms crossed over her chest, highland light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 190612923,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
