import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image71ffae488695a5ea = {
  id: "01a0c5f3-b3ca-7666-88eb-68eff978c806",
  type: "page-type/image",
  slug: "image-71ffae488695a5ea",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a large bowl of oranges and grapes against her front, Mediterranean terrace light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 2019358153,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
