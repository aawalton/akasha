import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD7147a431284bd2a = {
  id: "01a0c5f3-8d10-747b-b53c-73bac20668ba",
  type: "page-type/image",
  slug: "image-d7147a431284bd2a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "absorbed woman in a vintage ivory slip with lace trim, lying across a bed reading a paperback, warm lamplight and fairy lights, photorealistic photograph, natural skin texture, film grain",
  seed: 1346012366,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
