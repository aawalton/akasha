import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE1f596cdd0d07828 = {
  id: "01a0c5f4-03a4-7762-839f-cc20548823a2",
  type: "page-type/image",
  slug: "image-e1f596cdd0d07828",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. She stands at the long kitchen counter making morning coffee, one hand reaching up to an open cabinet, the wide sunlit kitchen spanning the frame. Shot on an 85mm portrait lens, under soft natural daylight.",
  seed: 102,
  width: 1344,
  height: 576,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
