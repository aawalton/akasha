import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA184c78d1568fe76 = {
  id: "01a0c5f4-03a4-7370-834b-481b054ec846",
  type: "page-type/image",
  slug: "image-a184c78d1568fe76",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, Interwoven daily life: unguarded domestic ordinary, partner-only imagery. She leans back along the length of the couch reading a book, legs stretched out, the living room spanning the frame behind her. Shot on an 85mm portrait lens, under soft natural daylight.",
  seed: 104,
  width: 1536,
  height: 640,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
