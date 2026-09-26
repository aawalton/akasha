import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image26e1c1d0a5430329 = {
  id: "01a0c5f3-b3c8-7295-a62c-31ffe00425d3",
  type: "page-type/image",
  slug: "image-26e1c1d0a5430329",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fierce woman in a flowing black dress with hair whipped across her face, eyes blazing through the strands, storm-front moorland, photorealistic photograph, natural skin texture, film grain",
  seed: 152146927,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
