import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b2e1dbd4538772b = {
  id: "01a0c5f3-b3ca-7019-8e64-34e4f02800ce",
  type: "page-type/image",
  slug: "image-9b2e1dbd4538772b",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude fortune-teller woman behind a glowing crystal ball on a table, mystic purple light, knowing smile, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 735803861,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
