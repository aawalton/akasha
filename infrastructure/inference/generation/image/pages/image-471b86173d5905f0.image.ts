import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image471b86173d5905f0 = {
  id: "019f57dd-c457-7f40-9016-d916c30d7c44",
  type: "page-type/image",
  slug: "image-471b86173d5905f0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "inviting woman in an open burgundy velvet robe over matching lingerie, curled in an armchair with a wine glass, firelight glow, photorealistic photograph, natural skin texture, film grain",
  seed: 499764610,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
