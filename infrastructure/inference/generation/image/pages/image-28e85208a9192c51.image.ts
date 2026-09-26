import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image28e85208a9192c51 = {
  id: "01a0c5f3-9f6a-7371-a45b-c3e1ae66aa18",
  type: "page-type/image",
  slug: "image-28e85208a9192c51",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman soaking in a claw-foot bathtub, water to her waist, knees up, steam rising, warm bathroom light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 791205600,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
