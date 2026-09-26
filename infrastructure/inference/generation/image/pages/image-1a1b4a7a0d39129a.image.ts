import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a1b4a7a0d39129a = {
  id: "019f58cd-8d1c-7de2-b753-5d38f9dd69d7",
  type: "page-type/image",
  slug: "image-1a1b4a7a0d39129a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude beekeeper woman holding a honeycomb frame across her front, golden drips, apiary sunlight, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1345659465,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
