import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFfaa2d60ddccc9dc = {
  id: "01a0c5f3-7a9c-793b-a144-b46cc418314e",
  type: "page-type/image",
  slug: "image-ffaa2d60ddccc9dc",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a lingerie model in her late twenties standing in the flow of a jungle waterfall, soaked, wet satin lingerie, hair slicked back by the water, confident pose, fine mist, editorial glamour photograph, 85mm, natural light, visible wet skin",
  seed: 838437811,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
