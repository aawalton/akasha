import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4ca18d900445c1b8 = {
  id: "019f1839-019c-71be-a108-8076ff548781",
  type: "page-type/image",
  slug: "image-4ca18d900445c1b8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fine-art portrait of two young brunette women with bare shoulders, sculptural and refined, leaning close with a quiet shared look between them, cool neutral grey backdrop, soft directional light, beautiful skin, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80160011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
