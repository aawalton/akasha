import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7884140d39b25a2e = {
  id: "01a0c5f3-8d0c-7ce7-8c63-d51fa6302c2a",
  type: "page-type/image",
  slug: "image-7884140d39b25a2e",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman with the patterned shadow of a lace curtain cast across her bare skin, the shadow her only 'garment', golden light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 136403474,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
