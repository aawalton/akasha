import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4a7eaaf2d1d30f5b = {
  id: "019f5805-be62-7a9e-a1ba-c53c17e5549a",
  type: "page-type/image",
  slug: "image-4a7eaaf2d1d30f5b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "theatrical woman in a black ostrich-feather gown shedding plumes mid-turn, feathers flying, dark stage in a single beam, photorealistic photograph, natural skin texture, film grain",
  seed: 996412266,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
