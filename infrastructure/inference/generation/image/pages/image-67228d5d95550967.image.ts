import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image67228d5d95550967 = {
  id: "01a0c5f3-b3ca-75c3-a739-406a08a1a133",
  type: "page-type/image",
  slug: "image-67228d5d95550967",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman hugging a large mirrored disco ball, fractured light speckling her skin, 70s dance glow, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 150401834,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
