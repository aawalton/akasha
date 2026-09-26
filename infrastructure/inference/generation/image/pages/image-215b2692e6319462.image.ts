import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image215b2692e6319462 = {
  id: "01a0c5f3-b3c8-7da3-80c1-9b6c6ac2fe2e",
  type: "page-type/image",
  slug: "image-215b2692e6319462",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman folk singer-songwriter, wavy auburn hair, light freckles across her nose, warm hazel eyes, soft natural features, gentle expression, in a recording studio booth wearing large headphones, leaning toward a pop-filter microphone, focused absorbed expression, soft key light, blurred acoustic foam behind, 85mm portrait, photoreal",
  seed: 1628138726,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
