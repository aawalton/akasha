import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image38aeb36c2466baae = {
  id: "01a0c5f3-9f6c-79e8-bd74-73be57f9b0e5",
  type: "page-type/image",
  slug: "image-38aeb36c2466baae",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman cradling a large fluffy white cat against her chest, the cat the only covering, soft home light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1630040046,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
