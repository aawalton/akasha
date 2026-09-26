import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image31900350fd8b5e9b = {
  id: "01a0c5f3-b3c8-7dd9-89cf-95170b2824aa",
  type: "page-type/image",
  slug: "image-31900350fd8b5e9b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "arresting woman in a leather mini and vintage band tee holding a subway pole among motion-blurred riders, direct eye contact, fluorescent car light, photorealistic photograph, natural skin texture, film grain",
  seed: 2062611034,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
