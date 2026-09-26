import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image272b555bbc7390c1 = {
  id: "01a0c5f3-b3ca-7d54-a683-a055f42e001f",
  type: "page-type/image",
  slug: "image-272b555bbc7390c1",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "burlesque woman peeking over a huge ostrich-feather fan held across her body, otherwise nude, velvet stage light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1718647519,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
