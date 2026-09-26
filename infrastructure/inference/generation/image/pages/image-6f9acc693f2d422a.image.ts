import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6f9acc693f2d422a = {
  id: "019f58bc-306a-7312-9a41-46d9a1724ace",
  type: "page-type/image",
  slug: "image-6f9acc693f2d422a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude festival woman holding two tambourines over her chest mid-shake, bohemian sunset field, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1916766357,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
