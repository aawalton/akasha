import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b9549da9a800319 = {
  id: "019f5803-4b9d-7658-8669-313622cd9162",
  type: "page-type/image",
  slug: "image-9b9549da9a800319",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "android-calm woman in a sculpted liquid-chrome dress holding a sharp angular pose, brutalist concrete atrium, photorealistic photograph, natural skin texture, film grain",
  seed: 1001431287,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
