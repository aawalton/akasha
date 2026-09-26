import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0c4dba50e27e6c65 = {
  id: "01a0c5f3-efff-7642-acf5-d2fbffcd7ae7",
  type: "page-type/image",
  slug: "image-0c4dba50e27e6c65",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude blonde woman astride a man's lap in bed, his mouth on her breast, her head tipped back in pleasure, her fingers gripped in his hair, loose golden hair spilling down her back, fair skin in dim warm ember light, rumpled linen sheets, photorealistic, 50mm, shallow depth of field, visible skin texture",
  seed: 2017616428,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
