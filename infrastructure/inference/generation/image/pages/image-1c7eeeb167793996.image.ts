import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1c7eeeb167793996 = {
  id: "019f1839-019b-7ddd-a9f8-7f9ad39b6433",
  type: "page-type/image",
  slug: "image-1c7eeeb167793996",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of two young women with warm radiant skin and bare shoulders, one resting her head on the other's shoulder with eyes softly closed, deeply serene and tender, soft warm light, genuine closeness, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80190011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
