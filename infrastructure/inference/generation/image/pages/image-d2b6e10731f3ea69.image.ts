import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD2b6e10731f3ea69 = {
  id: "019f58c9-e13b-7b1b-b781-d5ffe745b302",
  type: "page-type/image",
  slug: "image-d2b6e10731f3ea69",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude diver woman hugging a dive tank and mask to her chest, wet hair, boat-deck sun, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1171043473,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
