import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7e261281882f3f5f = {
  id: "01a0c5f3-8d10-7d98-bee6-c486e92b2253",
  type: "page-type/image",
  slug: "image-7e261281882f3f5f",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cozy woman in an off-shoulder cream knit sweater with bare legs, cradling a steaming mug in a cabin window seat, rain outside, photorealistic photograph, natural skin texture, film grain",
  seed: 109217295,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
