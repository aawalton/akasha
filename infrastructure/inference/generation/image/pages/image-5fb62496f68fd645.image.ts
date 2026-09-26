import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5fb62496f68fd645 = {
  id: "01a0c5f3-b3c9-7305-9108-0ba7b6392ff0",
  type: "page-type/image",
  slug: "image-5fb62496f68fd645",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "tender absorbed woman in a sheer floral wrap dress misting orchids, humid glass greenhouse with sunbeams, photorealistic photograph, natural skin texture, film grain",
  seed: 2071585937,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
