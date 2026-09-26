import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB79de8acc32c6af2 = {
  id: "01a0c5f3-9f6c-7ce2-9cbb-1144b032bcd3",
  type: "page-type/image",
  slug: "image-b79de8acc32c6af2",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude harpist woman behind the strings of a golden concert harp, fingers mid-pluck, seen through the strings, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1808437705,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
