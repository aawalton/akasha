import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image92dac492ed06f11e = {
  id: "019f58c3-ae49-7d0d-9f95-f3e1acadddde",
  type: "page-type/image",
  slug: "image-92dac492ed06f11e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude baker woman carrying a two-tier frosted cake in front of her torso, icing on her nose, kitchen light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 834485455,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
