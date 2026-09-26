import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBc288f5f08aa6888 = {
  id: "019f5825-42c1-77df-99d2-c8fd049373f1",
  type: "page-type/image",
  slug: "image-bc288f5f08aa6888",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "victorious tired-smiling woman with a spacesuit peeled to her waist over a black tank, helmet under her arm, hangar light, photorealistic photograph, natural skin texture, film grain",
  seed: 1976396088,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
