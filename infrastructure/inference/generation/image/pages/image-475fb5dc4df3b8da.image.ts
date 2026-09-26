import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image475fb5dc4df3b8da = {
  id: "019f5822-d2c1-7ff8-9e4d-b4a42b56b0a9",
  type: "page-type/image",
  slug: "image-475fb5dc4df3b8da",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cool androgynous woman in a tailored menswear suit with no shirt, loosening her tie with a smirk, low-lit hotel bar, photorealistic photograph, natural skin texture, film grain",
  seed: 553372024,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
