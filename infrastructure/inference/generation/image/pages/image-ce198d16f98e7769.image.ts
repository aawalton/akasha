import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCe198d16f98e7769 = {
  id: "01a0c5f4-03a4-74dc-a9a6-347a6cd5baf0",
  type: "page-type/image",
  slug: "image-ce198d16f98e7769",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. She stands at the long kitchen counter making morning coffee, one hand reaching up to an open cabinet, the wide sunlit kitchen spanning the frame. Shot on an 85mm portrait lens, under soft natural daylight.",
  seed: 102,
  width: 1536,
  height: 640,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
