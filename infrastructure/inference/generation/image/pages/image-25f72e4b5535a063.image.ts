import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image25f72e4b5535a063 = {
  id: "019f58a7-3931-7052-9a72-86b3038d9b4d",
  type: "page-type/image",
  slug: "image-25f72e4b5535a063",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman with ivy vines wound around her torso, forest-nymph energy, dappled woodland light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1535235647,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
