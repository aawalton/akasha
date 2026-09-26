import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3f4054b98d3bfc99 = {
  id: "01a0c5f3-b3ca-77ba-9e8e-c5d5c97b4246",
  type: "page-type/image",
  slug: "image-3f4054b98d3bfc99",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "surfer woman with her wetsuit peeled down to her waist, arms crossed over her chest, salt-wet hair, morning surf beach, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1845939977,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
