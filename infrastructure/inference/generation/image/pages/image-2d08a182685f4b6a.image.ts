import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d08a182685f4b6a = {
  id: "019f5807-a09f-7a02-abc1-f2598143c08f",
  type: "page-type/image",
  slug: "image-2d08a182685f4b6a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "noir woman in a black vinyl trench over a sheer slip standing under a streetlamp, side-eye through cigarette smoke, foggy midnight street, photorealistic photograph, natural skin texture, film grain",
  seed: 1217479089,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
