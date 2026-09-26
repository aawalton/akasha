import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0dca33f66fbdaa69 = {
  id: "019f5821-0318-71b7-ad78-6fd89f887662",
  type: "page-type/image",
  slug: "image-0dca33f66fbdaa69",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "ecstatic rockstar in leather pants and a studded bra under an open vest mid-guitar-windmill, arena stage pyro, photorealistic photograph, natural skin texture, film grain",
  seed: 560989716,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
