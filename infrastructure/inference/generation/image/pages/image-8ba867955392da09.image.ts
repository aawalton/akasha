import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8ba867955392da09 = {
  id: "01a0c5f3-b3c8-7b67-a34b-2c0473c54b9a",
  type: "page-type/image",
  slug: "image-8ba867955392da09",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "beautiful feminine woman, soft face and long lashes, wearing an oversized tailored blazer over a black lace bralette, loosening a silk tie with a smirk, glossy lips, low-lit hotel bar, photorealistic photograph, natural skin texture, film grain",
  seed: 115511701,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
