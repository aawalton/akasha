import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3352536cc45705cc = {
  id: "01a0c5f3-9f6a-7bd1-a79f-f504f3136d93",
  type: "page-type/image",
  slug: "image-3352536cc45705cc",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "serene east asian woman in an embroidered emerald silk qipao with high slit under a paper umbrella, sidelong glance, lantern-lit rainy alley, photorealistic photograph, natural skin texture, film grain",
  seed: 899171374,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
