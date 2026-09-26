import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image14b319ff07c70989 = {
  id: "01a0c5f3-7a9b-7c25-8b26-4f40df9f5bd2",
  type: "page-type/image",
  slug: "image-14b319ff07c70989",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "melancholy woman with great black feathered wings and smoke-gray silk drape, crouched on a cathedral gargoyle, moonlit gothic spires, photorealistic photograph, natural skin texture, film grain",
  seed: 1832319439,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
