import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDa97473ccb545dfb = {
  id: "01a0c5f3-b3ca-778b-8c02-48ae0e909816",
  type: "page-type/image",
  slug: "image-da97473ccb545dfb",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "secretive woman in a black evening gown holding a lace masquerade mask half away from her face, venetian ballroom candlelight, photorealistic photograph, natural skin texture, film grain",
  seed: 147770484,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
