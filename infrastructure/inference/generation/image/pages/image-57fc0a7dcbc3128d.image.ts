import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image57fc0a7dcbc3128d = {
  id: "01a0c5f3-9f6c-7469-b9fa-13ad0b9e14b8",
  type: "page-type/image",
  slug: "image-57fc0a7dcbc3128d",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman hugging herself by a frosted window, snow falling outside, arms as covering, cold blue light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1602695202,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
