import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE42b781e0584b940 = {
  id: "01a0c5f3-b3c9-71c8-aeb9-be3272ae3e14",
  type: "page-type/image",
  slug: "image-e42b781e0584b940",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a swimsuit and sheer sarong standing in a golden Algarve sea cave, sculpted cliffs and turquoise water, shafts of sunlight, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1929526348,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
