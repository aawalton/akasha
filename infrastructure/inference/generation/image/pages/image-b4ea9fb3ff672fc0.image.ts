import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB4ea9fb3ff672fc0 = {
  id: "019f5802-7b3c-7151-a345-4293f8b95c54",
  type: "page-type/image",
  slug: "image-b4ea9fb3ff672fc0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "icy woman in a glossy red latex catsuit standing under a single spotlight, unreadable stare, black studio void, photorealistic photograph, natural skin texture, film grain",
  seed: 1434518878,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
