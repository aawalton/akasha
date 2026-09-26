import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image39e912d743294e00 = {
  id: "019f5819-b3d3-7ae8-b29c-8f359eb2b81c",
  type: "page-type/image",
  slug: "image-39e912d743294e00",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "triumphant athlete in a sports bra with a medal, arms thrown up in a victorious scream, confetti falling in a stadium at night, photorealistic photograph, natural skin texture, film grain",
  seed: 220777589,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
