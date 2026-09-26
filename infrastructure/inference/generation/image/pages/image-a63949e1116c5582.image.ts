import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA63949e1116c5582 = {
  id: "01a0c5f4-03a4-73f0-b482-d962cf0e43a5",
  type: "page-type/image",
  slug: "image-a63949e1116c5582",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. She leans back along the length of the couch reading a book, legs stretched out, the living room spanning the frame behind her. Shot on an 85mm portrait lens, under soft natural daylight.",
  seed: 104,
  width: 1344,
  height: 576,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
