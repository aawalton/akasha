import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5536db83f997758f = {
  id: "01a0c5f3-9f6a-7a0b-aeaa-1db9677d85f6",
  type: "page-type/image",
  slug: "image-5536db83f997758f",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman in a rustic outdoor shower, dappled sunlight through leaves, natural setting, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1402177619,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
