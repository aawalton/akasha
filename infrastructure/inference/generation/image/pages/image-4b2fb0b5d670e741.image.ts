import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b2fb0b5d670e741 = {
  id: "01a0c5f3-9f6b-7432-ba15-7129d175b90d",
  type: "page-type/image",
  slug: "image-4b2fb0b5d670e741",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman reading a book propped on a pillow in bed, sheet across her lower body, cozy lamplight, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 882200372,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
