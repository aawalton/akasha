import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE825b17fbfd9ac08 = {
  id: "019f1839-2e88-7b97-9ec7-aeb2265c7d4f",
  type: "page-type/image",
  slug: "image-e825b17fbfd9ac08",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A timeless young woman, luminous unlined youthful face with deep ancient grieving-wise eyes, loose hair, a single fine thread of soft light looping back on itself at her throat like an eternity sign, classical clean styling not costume, dark quiet background with a subtle glow, photorealistic close portrait, the self-caused one, serene",
  seed: 104,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
