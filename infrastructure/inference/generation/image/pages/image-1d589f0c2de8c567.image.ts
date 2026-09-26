import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d589f0c2de8c567 = {
  id: "01a0c5f3-b3c7-7f02-93bd-f2b78d694606",
  type: "page-type/image",
  slug: "image-1d589f0c2de8c567",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "giggling woman in a chunky knit sweater dress and wool socks holding cocoa by a roaring fire, alpine lodge glow, photorealistic photograph, natural skin texture, film grain",
  seed: 1623189566,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
