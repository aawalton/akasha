import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image742108cd566c5b16 = {
  id: "01a0c5f3-f000-77b4-836b-7bb72ef3e8c4",
  type: "page-type/image",
  slug: "image-742108cd566c5b16",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol build, standing in warm tropical rain under large palm leaves wearing only a thin wet transparent white nightgown clinging to her, delighted smile, rain streaming down, warm soft light, authentic candid travel snapshot, natural skin texture",
  seed: 1256635406,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
